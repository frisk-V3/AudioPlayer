using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Input;
using Avalonia.Platform.Storage;
using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;

namespace Audio_Player
{
    public partial class MainWindow : Window
    {
        private string? _selectedPath;

        public MainWindow()
        {
            InitializeComponent();
            // ドラッグアンドドロップイベントの登録
            AddHandler(DragDrop.DropEvent, OnDrop);
        }

        private async void SelectFile_Click(object? sender, RoutedEventArgs e)
        {
            var topLevel = GetTopLevel(this);
            if (topLevel == null) return;

            // 修正: [ ] (コレクション式) がエラーになる場合は new[] { ... } に戻してください
            var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
            {
                Title = "音声ファイルを選択",
                AllowMultiple = false,
                FileTypeFilter = new[] { FilePickerFileTypes.All }
            });

            if (files.Count > 0)
            {
                UpdatePath(files[0].Path.LocalPath);
            }
        }

        private void OnDrop(object? sender, DragEventArgs e)
        {
            // 修正: DataSnapshotではなく e.Data を直接使い、かつ最新のパス取得方式に合わせる
            var files = e.Data.GetFiles();
            if (files != null && files.Any())
            {
                var firstFile = files.First();
                UpdatePath(Uri.UnescapeDataString(firstFile.Path.LocalPath));
            }
        }

        private void UpdatePath(string path)
        {
            _selectedPath = path;
            PathDisplay.Text = System.IO.Path.GetFileName(path);
            PathDisplay.Foreground = Avalonia.Media.Brushes.White;
        }

        private void PlayButton_Click(object? sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(_selectedPath)) return;

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                // Windowsはパスを引用符で囲む
                Process.Start("powershell", $"-c (New-Object System.Media.SoundPlayer '{_selectedPath}').PlaySync()");
            }
            else
            {
                // Mac / Linux 用のコマンド実行
                string command = RuntimeInformation.IsOSPlatform(OSPlatform.OSX) ? "afplay" : "aplay";
                Process.Start(command, $"\"{_selectedPath}\"");
            }
        }
    }
}