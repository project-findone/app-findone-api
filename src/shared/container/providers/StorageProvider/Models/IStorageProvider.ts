export default interface IStorageProvider {
  saveFile(file: string, pathName: string): Promise<string>
  deleteFile(file: string, pathName: string): Promise<void>
}
