/**
 * Get the file type from a file name ex file.txt (txt)
 * @param fileName
 * @returns
 */
export function fileType(fileName: string): string {
  return fileName.split(".")[1];
}

/**
 * Download a file from Telegram
 * @param url The telegram URL for the file
 * @param dest The destination on the server
 * @throws err
 */
export async function downloadFile(
  url: string,
  dest: string,
): Promise<Deno.FsFile> {
  const response = await fetch(url);

  const file = await Deno.open(dest, {
    write: true,
    create: true,
  }).catch((err) => {
    throw err;
  });
  await response.body?.pipeTo(file.writable);

  return file;
}
