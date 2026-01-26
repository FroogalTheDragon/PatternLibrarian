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
  fileName: string,
): Promise<string> {
  const response = await fetch(url);
  const filePath = `/tmp/${fileName}`; // Download file to /tmp directory for now

  const file = await Deno.open(filePath, {
    write: true,
    create: true,
  }).catch((err) => {
    throw err;
  });
  await response.body?.pipeTo(file.writable);

  return filePath;
}
