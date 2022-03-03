using CsvHelper;
using CsvHelper.Configuration;
using SP.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

namespace SP.DAL
{
    public class QueueData
    {
        public string FileName { get; set; }
        public dynamic Data { get; set; }
    }

    public static class DataWriter
    {
        static readonly ConcurrentQueue<QueueData> queune = new ConcurrentQueue<QueueData>();
        static System.Timers.Timer aTimer;
        public static void AddRange<T>(IList<T> data, string fileName)
        {
            foreach (var d in data)
            {
                queune.Enqueue(new QueueData { FileName = fileName, Data = d });
            }
        }
        public static void Add<T>(T data, string fileName)
        {
           queune.Enqueue(new QueueData { FileName = fileName, Data = data });
        }

        public static void Remove<T>(this T[] arr,int position, int length)
        {
            int i;
            for (i = position; i < length - 1; i++)
            {
                arr[i] = arr[i + 1];
            }
            arr[length - 1] = default;
        }

        public static void WriterCsv()
        {
            if (queune.IsEmpty) return;

            try
            {
                aTimer.Enabled = false;
                var list = queune.ToList();
                queune.Clear();
                Parallel.ForEach(list.GroupBy(x => x.FileName).ToList(), (l) =>
                {
                    var directoryName = Path.Combine(WebRoot.WWWRoot, "Data");

                    if (!Directory.Exists(directoryName))
                        Directory.CreateDirectory(directoryName);
                    var path = Path.Combine(directoryName, $"{l.Key}.csv");

                    if (!File.Exists(path))
                    {
                        using FileStream fs = File.Create(path);
                        fs.Close();
                        using var writer = new StreamWriter(path);
                        using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
                        var data = new ConcurrentBag<dynamic>();
                        foreach(var j in l){ data.Add(j.Data); }
                        csv.WriteRecords(data);
                    }

                    else
                    {
                        // Append to the file.
                        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                        {
                            // Don't write the header again.
                            HasHeaderRecord = false,
                        };

                        using var stream = File.Open(path, FileMode.Append);
                        using var writer = new StreamWriter(stream);
                        using var csv = new CsvWriter(writer, config);
                        var data = new ConcurrentBag<dynamic>();
                        foreach (var j in l) { data.Add(j.Data); }
                        csv.WriteRecords(data);
                    }
                });
                aTimer.Enabled = true;
            }
            catch
            {
                aTimer.Enabled = true;
            }
            
        }
        private static void Backup()
        {
            if(DateTime.Now.Hour is 23) { 
            aTimer.Enabled = false;
            var directoryName = Path.Combine(WebRoot.WWWRoot, "Data");
             if (Directory.Exists(directoryName))
             {
                 try
                 {
                     if (!Directory.Exists(Path.Combine(WebRoot.WWWRoot, "Backup", DateTime.Now.ToString("D"))))
                         Directory.CreateDirectory(Path.Combine(WebRoot.WWWRoot, "Backup", DateTime.Now.ToString("D")));
                     var di = new DirectoryInfo(directoryName);
                     Parallel.ForEach(di.GetFiles(), (FileInfo file) =>
                     {
                         if (!File.Exists(Path.Combine(WebRoot.WWWRoot, "Backup", DateTime.Now.ToString("D"), $"{DateTime.Now.ToString("D")}-{file.Name}")))
                         {
                             file.CopyTo(Path.Combine(WebRoot.WWWRoot, "Backup", DateTime.Now.ToString("D"), $"{DateTime.Now.ToString("D")}-{file.Name}"));
                         }
                     });
                        aTimer.Enabled = true;
                 }
                 catch (Exception ex)
                 {
                        aTimer.Enabled = true;
                 }
             }
            }
        }

        private async static Task Trim()
        {
            await DataReader
           .ReadCsv<Student>(nameof(Student))
            .Distinct(x => x.StudentId, x => x.State)
            .OverWrite().ConfigureAwait(false);

            await DataReader
            .ReadCsv<RegisteredCourse>(nameof(RegisteredCourse))
            .OverWrite().ConfigureAwait(false);

            await DataReader
            .ReadCsv<StudentResult>(nameof(StudentResult))
            .OverWrite().ConfigureAwait(false);

            await DataReader
           .ReadCsv<EmergencyContact>(nameof(EmergencyContact))
           .OverWrite().ConfigureAwait(false);

            await DataReader
            .ReadCsv<Institution>(nameof(Institution))
            .Distinct(x => x.InstitutionId, x => x.State)
            .OverWrite().ConfigureAwait(false);

            await DataReader
            .ReadCsv<Program>(nameof(Program))
            .OverWrite().ConfigureAwait(false);

             await DataReader
             .ReadCsv<MountedCourse>(nameof(MountedCourse))
             .OverWrite().ConfigureAwait(false);

             await DataReader
             .ReadCsv<Specialization>(nameof(Specialization))
             .OverWrite().ConfigureAwait(false);
            await DataReader.ReadCsv<School>(nameof(School))
             .OverWrite().ConfigureAwait(false);

            //DataReader.ReadCsv<Course>(nameof(Course))
        }

        private static Task OverWrite<T>(this IEnumerable<T> arr)
        {
            var directoryName = Path.Combine(WebRoot.WWWRoot, "Data");

            if (!Directory.Exists(directoryName))
                Directory.CreateDirectory(directoryName);
            var path = Path.Combine(directoryName, $"{nameof(Student)}.csv");

            using FileStream fs = File.Create(path);
            fs.Close();
            using var writer = new StreamWriter(path);
            using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            return csv.WriteRecordsAsync(arr);
        }

        public static void Start(int seconds)
        {
            // Create a timer with a two second interval.
            aTimer = new System.Timers.Timer(seconds * 1000);
            // Hook up the Elapsed event for the timer. 
            aTimer.Elapsed += OnTimedEvent;
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }

        private static void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            Backup();
            WriterCsv();
        }


        private static string PathSetup(string fileName)
        {
            var path = Path.Combine(WebRoot.WWWRoot, $"Data/{fileName}.txt");

            if (!Directory.Exists(WebRoot.WWWRoot))
                Directory.CreateDirectory(WebRoot.WWWRoot);

            if (!File.Exists(path)) { File.Create(path); }

            return path;
        }
        public static void WriterData<T>(T data, string fileName)
        {
            new Thread(() =>
            {
                try
                {
                    Thread.CurrentThread.IsBackground = true;
                    var applicationPath = PathSetup(fileName);

                    lock (applicationPath) {                        
                        using var sw = new StreamWriter(applicationPath, true);
                        var json = new StringBuilder();
                        json.Append(JsonSerializer.Serialize(data)).Append(',');
                        sw.WriteLine(json);
                    }
                }
                catch (Exception ex)
                {
                }
            }).Start();
        }

        public static void WriterData<T>(IEnumerable<T> data, string fileName)
        {
            new Thread(() =>
            {
                try
                {
                    Thread.CurrentThread.IsBackground = true;
                    var applicationPath = PathSetup(fileName);
                    lock (applicationPath)
                    {
                        using (var sw = new StreamWriter(applicationPath, true))
                        {
                            var json = new StringBuilder();
                            foreach(var d in data)
                            {
                                json.Append(JsonSerializer.Serialize(d)).Append(',');
                            }
                            sw.WriteLine(json);
                        }
                    }
                }
                catch (Exception ex)
                {
                }
            }).Start();
        }

        public static void Delete()
        {
            if (Directory.Exists(WebRoot.WWWRoot))
            {
                try 
                {
                    var di = new DirectoryInfo(WebRoot.WWWRoot);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                } 
                catch(Exception ex) 
                {
                }
                
            }
        }

        //private static string PathSetup(string fileName)
        //{
        //    var path = Path.Combine(WebRoot.WWWRoot, $"Data/{fileName}.csv");

        //    if (!Directory.Exists(WebRoot.WWWRoot))
        //        Directory.CreateDirectory(WebRoot.WWWRoot);

        //    if (!File.Exists(path)) { File.Create(path); }

        //    return path;
        //}

    }
}
