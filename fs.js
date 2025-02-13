import * as fs from "node:fs/promises";
import { type } from "node:os";
import path from "node:path";

// function createFile(pathname){
    // SYNC
    // fs.writeFileSync(pathname, "Hello this is Anuj");

    // for append content
    // fs.appendFileSync(pathname, " from IT")



    // ASYNC
    // Error first callbacks
    // fs.writeFile(pathname, 'Hello this is Async function', (err) => {
    //     if(err){
    //         console.log('Something went wronh while creating file.')
    //         return
    //     }
    //     console.log('file has been created asynchronously.')


    //     // append
    //     fs.appendFile(pathname, 'Hello this is Async function', (err) => {
    //         if(err){
    //             console.log('Something went wronh while creating file.')
    //             return
    //         }
    //         console.log('file has been created asynchronously.')
    //     })
    // })



    


    // console.log("file operating done!");
// }






// Promises API
// async function createFile(pathname) {
//     try {
//         await fs.writeFile(pathname, 'Hello Nodejs:fs/promises')
//         await fs.appendFile(pathname, ' Hello Nodejs:fs/promises')
//     } catch (error) {
//         console,localStorage(error);
//     }
// }

// async function  getFileInfo(filepath) {
//     const stats = await fs.stat(filepath);

//     return {
//         size: `${stats.size / 1024}.tofixed(2) KB`,
//         created: stats.birthtime.toLocaleString(),
//         modified: stats.mtime.toLocaleString(),
//     };
    
    
// };

// getFileInfo("./hello.txt").then((data) => {
//     console.log('data', data);
// })


// for create folder
export async function createFolder(foldername){
    await fs.mkdir(foldername, {recursive: true})
}


// for create file
export async function createFile(pathname, content){
    await fs.writeFile(pathname, content)
}

// for append file
export async function writeToFile(pathname, content=""){
    await fs.appendFile(pathname, content);
}

// for delete file
export async function deleteFile(filepath){
    await fs.unlink(filepath);
}

// for delete folder
export async function deleteFolder(folderPath){
    await fs.rm(folderPath, {recursive: true});
}

// for listItem
export async function listItems(listPath='./'){
    const items = await fs.readdir(listPath, {withFileTypes: true});
    return items.map((item) => {
        return {
            name: item.name,
            type: item.isDirectory() ? 'folder' : 'file',
            path: path.join(import.meta.dirname, item.name),
        }
    })
}
