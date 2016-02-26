using Microsoft.VisualBasic.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace winfo
{
    class Program
    {
        /*
        Inspiration from http://stackoverflow.com/questions/2708663/how-can-i-get-the-processor-name-of-my-machine-using-c-net-3-5
        and http://stackoverflow.com/questions/11325315/get-cpu-multi-core-usage-in-visual-c-sharp
        list of keys here
        https://msdn.microsoft.com/en-us/library/aa394373%28VS.85%29.aspx
        and possibly here
        https://msdn.microsoft.com/en-us/library/aa394323%28v=vs.85%29.aspx
            */

        static void Main(string[] args)
        {
            try
            {
                List<Processor> processors = new List<Processor>();
                // grab processors
                using (ManagementObjectSearcher mos = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_Processor"))
                {
                    foreach (ManagementObject mo in mos.Get())
                    {
                        // available keys are here: https://msdn.microsoft.com/en-us/library/aa394373%28VS.85%29.aspx
                        string name = (string)mo["Name"];
                        UInt32 coreCount = (UInt32)mo["NumberOfCores"];
                        UInt16 averageLoad = (UInt16)mo["LoadPercentage"];
                        processors.Add(new Processor(name, coreCount, averageLoad));
                    }
                }

                // read load for cores
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2",
                        "SELECT Name, PercentProcessorTime FROM Win32_PerfFormattedData_Counters_ProcessorInformation WHERE NOT Name = '_Total' AND NOT Name = '0,_Total'"))
                {
                    Dictionary<int, List<ProcessorCore>> cores = new Dictionary<int, List<ProcessorCore>>();
                    foreach (ManagementObject queryObj in searcher.Get())
                    {
                        string name = (string)queryObj["Name"];
                        UInt64 time = (UInt64)queryObj["PercentProcessorTime"];

                        string processorNumber = name.Split(',')[0];
                        int processorNumberAsInt = int.Parse(processorNumber);

                        if (cores.ContainsKey(processorNumberAsInt))
                        {
                            cores[processorNumberAsInt].Add(new ProcessorCore(time));
                        }
                        else
                        {
                            cores.Add(processorNumberAsInt, new List<ProcessorCore>(new[] { new ProcessorCore(time) }));
                        }
                    }

                    foreach (var coreInfo in cores.OrderBy(kvp => kvp.Key))
                    {
                        processors[coreInfo.Key].Cores = coreInfo.Value.ToArray();
                    }
                }

                // get RAM
                ComputerInfo c = new ComputerInfo();
                ulong memTotal = c.TotalPhysicalMemory;
                ulong memUsed = memTotal - c.AvailablePhysicalMemory;

                // dump to console as expected json
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var o = new { success = true, processors = processors, memory = new { totalgig = (memTotal / 1073741824d), usedgig = (memUsed / 1073741824d) }, exception = string.Empty };
                Console.WriteLine(serializer.Serialize(o));
                string s = serializer.Serialize(o);
            }
            catch (Exception e)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var o = new { success = false, exception = e.ToString() };
                Console.WriteLine(serializer.Serialize(o));
            }
        }
    }
}
