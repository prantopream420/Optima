using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace AeroOptimaApp
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string distIndex = Path.Combine(baseDir, "dist", "index.html");

                // Check edge path
                string edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Microsoft\Edge\Application\msedge.exe");
                if (!File.Exists(edgePath))
                {
                    edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Microsoft\Edge\Application\msedge.exe");
                }
                if (!File.Exists(edgePath))
                {
                    edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Microsoft\Edge\Application\msedge.exe");
                }

                // If dist/index.html exists locally, launch it in app mode
                string targetUrl = File.Exists(distIndex) ? new Uri(distIndex).AbsoluteUri : "http://localhost:3000";

                if (File.Exists(edgePath))
                {
                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = edgePath;
                    psi.Arguments = "--app=\"" + targetUrl + "\" --window-size=1380,880 --class=\"AeroOptimaPro\" --enable-features=MicaWindow,FluentOverlayScrollbar --allow-file-access-from-files";
                    psi.UseShellExecute = true;
                    Process.Start(psi);
                }
                else
                {
                    Process.Start(new ProcessStartInfo(targetUrl) { UseShellExecute = true });
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error launching AeroOptima: " + ex.Message, "AeroOptima Pro", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
