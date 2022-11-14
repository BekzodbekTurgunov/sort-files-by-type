const  path = require('path');
const fs = require("fs")
const isImage = ['.gif','.jpg','.jpeg','.png', '.svg'],
isVideo =['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4', '.avi', '.mov', '.flv', '.'],
isDocument=['.pdf','.doc', '.docx', '.xls', '.xlsx', '.txt', '.ppt', '.pptx', '.odp'],
isMusic=['.mp3', '.wav', '.m4a']

const basePath = "C:\\Users\\night\\Downloads\\Telegram Desktop"
const files = fs.readdirSync(basePath);
sortFiles(files)
createFolders(basePath)

function sortFiles(files){
    for (let i = 0; i<files.length; i++) {
        const file = files[i]
        const fileType = path.extname(file)
        if(fileType) {
            let folder = 'others'
            if(isImage.some(image => image === fileType )){
                folder = 'photos'
            }else if (isVideo.some(video => video === fileType)){
                folder = 'videos'
            }else if (isDocument.some(document => document === fileType)){
                folder = 'documents'
            }else if (isMusic.some(music => music === fileType)){
                folder = 'musics'
            }

            const newDir = path.join(basePath, folder, file)
            const oldDir = path.join(basePath,file)

            fs.copyFile(oldDir, newDir, (err) => {
                if(err){
                    console.log(oldDir)
                    console.log("Error on copying file", err.message)
                }else {
                    fs.unlink(oldDir, (err)=> {})
                }

            })
        }else {
            console.log("Folder can not be removed")
        }
    }
    console.log("File successfully sorted by type")
}

function createFolders(path){
    const folders = ['photos', 'videos', 'musics', 'documents', 'others']
    folders.map(folder => {
        const dir = path + '/' + folder
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }
    })
}
