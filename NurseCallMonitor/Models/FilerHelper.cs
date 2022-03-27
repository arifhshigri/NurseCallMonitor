using System;
using System.Collections.Generic;
using System.IO;

namespace NurseCallMonitor.Models
{
    public  static class FilerHelper
    {

        public static List<string> ReadFilenames(string path)
        {
            try
            {
                DirectoryInfo d = new DirectoryInfo(path); //Assuming Test is your Folder

                FileInfo[] Files = d.GetFiles("*.json"); //Getting Text files
                var files_names = new List<string>();
                foreach (FileInfo file in Files)
                {
                    files_names.Add(file.Name.Replace(".json",""));
                }
                return files_names;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public  static void Write(string path,string filename,string json)
        {
            try
            {
                TextWriter writer;
                using (writer = new StreamWriter($"{path}/{filename}.json", append: false))
                {
                    writer.WriteLine(json);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        internal static string ReadFloor(string floorFilePath, string floorName)
        {
            try
            {
                  
                TextReader textReader;
                using (textReader = new StreamReader($"{floorFilePath}/{floorName}.json", System.Text.Encoding.Default))
                {
                   string val= textReader.ReadToEnd( );
                   return val;
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
    }
}
