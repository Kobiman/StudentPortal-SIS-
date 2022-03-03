using AuthServer5;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Sp.Commands;
using SP.Commands;
using SP.DAL;
using SP.Models.Dtos;
using SP.Services;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using SP.Web.Api.BackgroundServices;
using SP.Web.Api.Channels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP.Web.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
            //    options.OnAppendCookie = cookieContext =>
            //        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
            //    options.OnDeleteCookie = cookieContext =>
            //        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
            //});

            services.AddControllers();
            services.AddHostedService<MountCourseBackgroundService>();
            services.AddSingleton<IUnitOfWork, UnitOfWork>(); 
            services.AddSingleton<IMountCourseChannel, MountCourseChannel>(); 
            services.AddTransient<IPageService, PageService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ILookupService, LookupService>();
            services.AddScoped<ISchoolService, SchoolService>();
            services.AddScoped<IProgramService, ProgramService>();
            services.AddScoped<IStudentService, StudentService>();
            services.AddScoped<ILecturerService, LecturerService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddSingleton<ICommandProcessor, CommandProcessor>();
            services.AddScoped<IInstitutionService, InstitutionService>();
            services.AddTransient<ICheckResultCommand, CheckResultCommand>(); 
            services.AddScoped<IStatusControlService, StatusControlService>();
            services.AddTransient<IGetTrailListCommand, GetTrailListCommand>();
            services.AddTransient<IGetExamResultsCommand, GetExamResultsCommand>();
            services.AddTransient<IAddExamResultsCommand, AddExamResultsCommand>();
            services.AddTransient<IGradesSettingsService, GradesSettingsService>();
            services.AddTransient<IUserPermissionService, UserPermissionService>();
            services.AddTransient<IApproveResultsCommand, ApproveResultsCommand>();
            services.AddTransient<IGetFeeStatementCommand, GetFeeStatementCommand>();
            services.AddTransient<IAddMountedCourseCommand, AddMountedCourseCommand>();
            services.AddTransient<IGetMountedCoursesCommand, GetMountedCoursesCommand>();
            services.AddTransient<IGetAttendanceListForExamsCommand, GetAttendanceListForExamsCommand>();
            services.AddTransient<ICanRegisterStudentCommand, CanRegisterStudentCommand>();         
            services.AddTransient<IGetSchoolByProgramCommand, GetSchoolByProgramCommand>();
            services.AddTransient<IDeleteMountedCourseCommand, DeleteMountedCourseCommand>();
            services.AddTransient<IAssignMountedCourseCommand, AssignMountedCourseCommand>();
            services.AddTransient<IAddRegisteredCoursesCommand, AddRegisteredCoursesCommand>();
            services.AddTransient<IGetRegisteredCoursesCommand, GetRegisteredCoursesCommand>();
            services.AddTransient<IGetRegisteredStudentsCommand, GetRegisteredStudentsCommand>();
            services.AddTransient<IGetStudentsEnteryLevelCommand, GetStudentsEnteryLevelCommand>();
            services.AddTransient<IUpdateRegisteredCoursesCommand, UpdateRegisteredCoursesCommand>();
            services.AddTransient<IApproveRegisteredCoursesCommand, ApproveRegisteredCoursesCommand>();
            services.AddTransient<IGetDepartmentsWithCoursesCommand, GetDepartmentsWithCoursesCommand>();
            services.AddTransient<IGetRegisteredCoursesForApprovalCommand, GetRegisteredCoursesForApprovalCommand>();
            services.AddTransient<IGetMountedCoursesForRegistrationCommand, GetMountedCoursesForRegistrationCommand>();
            services.AddTransient<IGetMountedCoursesForResultsUploadCommand, GetMountedCoursesForResultsUploadCommand>();
                        
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SP.Web.Api", Version = "v1" });
            });

            services.AddAuthentication("Bearer")
               .AddJwtBearer("Bearer", options =>
               {
                   options.Authority = "https://auth.uenr.edu.gh/";
                   //https://auth.uenr.edu.gh/
                   options.RequireHttpsMetadata = false;

                   options.Audience = "api1";

                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateAudience = false
                   };
               });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SP.Web.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(
              builder =>
              builder.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              );

            WebRoot.WWWRoot = env.WebRootPath;
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
