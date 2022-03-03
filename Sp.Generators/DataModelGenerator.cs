using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sp.Generators
{
    [Generator]
    public class DataModelGenerator : ISourceGenerator
    {
        public void Execute(GeneratorExecutionContext context)
        {
            var compilation = (CSharpCompilation)context.Compilation;
            IReadOnlyList<INamedTypeSymbol> types = GetAllTypes(compilation.Assembly);
            StringBuilder sb = new StringBuilder();
            foreach (var t in types)
            {
                if (t.Name == "UserPermission") //UserPermission
                {
                    sb.Append($@"
                   using System;
                   namespace  SP.Models
                   {{
                      public class D{t.Name}
                    {{
                       public D{t.Name}(int length)
                      {{
                           this.length = length;
                        ");

                    var _members =
                    t.GetMembers().OfType<IPropertySymbol>()
                    .Where(_ => _.SetMethod != null && _.SetMethod.DeclaredAccessibility == Accessibility.Public).ToList();
                    for (var m = 0; m < _members.Count; m++)
                    {
                        if (_members[m].Name.Equals("Count"))
                        {
                            sb.Append($@"{_members[m].Name} = 0;");
                            sb.Append(Environment.NewLine);
                        }
                        else
                        {
                            sb.Append($@"{_members[m].Name} =  new {_members[m].Type}[length];");
                            sb.Append(Environment.NewLine);
                        }
                    }
                    sb.Append($@"}}");

                    sb.Append($@"
                           public void Add({t.MetadataName} type)
                          {{
                          ");

                    sb.Append($@"
                       lock (type)
                        {{
                           if (Count == {_members[0].Name}.Length)
                           {{
                              var newLength = {_members[0].Name}.Length + 1000;
                            ");
                    for (var m = 0; m < _members.Count; m++)
                    {
                        if (!_members[m].Name.Equals("Count"))
                        {
                            sb.Append($@"var _{_members[m].Name} = new {_members[m].Type}[newLength];");
                            sb.Append(Environment.NewLine);
                            sb.Append($@"{_members[m].Name}.CopyTo(_{_members[m].Name});");
                            sb.Append(Environment.NewLine);
                            sb.Append($@"{_members[m].Name} = _{_members[m].Name};");
                            sb.Append(Environment.NewLine);
                        }
                    }
                    sb.Append($@"      
                          }}");
                    for (var m = 0; m < _members.Count; m++)
                    {
                        if (_members[m].Name.Equals("State"))
                        {
                            sb.Append($@"{_members[m].Name}.Span[Count]++;");
                            sb.Append(Environment.NewLine);
                        }
                        else
                        {
                            sb.Append($@"{_members[m].Name}.Span[Count] = type.{_members[m].Name};");
                            sb.Append(Environment.NewLine);
                        }
                    }
                    
                    sb.Append($@"Count++;");
                    sb.Append(Environment.NewLine);
                    sb.Append($@"}}
                        }}");
                    sb.Append($@"
                           private readonly int length;
                          ");
                    sb.Append(Environment.NewLine);
                    sb.Append($@"
                           public int Count;
                          ");
                    sb.Append(Environment.NewLine);

                    for (var m = 0; m < _members.Count; m++)
                    {
                        sb.Append($@" public Memory<{_members[m].Type}> {_members[m].Name};");
                        sb.Append(Environment.NewLine);
                    }



                    sb.Append($@"}}
                     }}");
                }
            }
            context.AddSource("dataModelGenerator", SourceText.From(sb.ToString(), Encoding.UTF8));
        }

        public void Initialize(GeneratorInitializationContext context)
        {
            
        }

        private IReadOnlyList<INamedTypeSymbol> GetAllTypes(IAssemblySymbol symbol)
        {
            var result = new List<INamedTypeSymbol>();
            GetAllTypes(result, symbol.GlobalNamespace);
            return result;
        }

        private void GetAllTypes(List<INamedTypeSymbol> result, INamespaceOrTypeSymbol symbol)
        {
            if (symbol is INamedTypeSymbol type)
                result.Add(type);

            foreach (var child in symbol.GetMembers())
                if (child is INamespaceOrTypeSymbol nsChild)
                    GetAllTypes(result, nsChild);
        }
    }
}
