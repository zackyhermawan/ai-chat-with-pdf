import fs from "fs/promises"

export const deleteFile = async(path: string) => {
    try {
        await fs.unlink(path)
    } catch {
        
    }
}