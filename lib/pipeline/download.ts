import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import ytdl from "youtube-dl-exec";

export type DownloadResult = { localPath: string; durationSec: number; title: string };

export async function downloadVideo(url: string): Promise<DownloadResult> {
  const dir = await mkdtemp(path.join(tmpdir(), "presence-"));
  const outTemplate = path.join(dir, "video.%(ext)s");

  const info = (await ytdl(url, {
    output: outTemplate,
    format: "mp4/bv*+ba/b",
    noPlaylist: true,
    printJson: true,
    noWarnings: true,
    quiet: true,
  })) as { duration?: number; title?: string; _filename?: string; requested_downloads?: { filepath?: string }[] };

  const localPath =
    info.requested_downloads?.[0]?.filepath ??
    info._filename ??
    path.join(dir, "video.mp4");

  return {
    localPath,
    durationSec: Math.round(info.duration ?? 0),
    title: info.title ?? "Untitled",
  };
}
