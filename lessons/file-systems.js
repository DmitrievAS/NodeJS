const fs = require("fs")
const path = require("path")
const fsPromise = require("fs/promises");
//
// fs.mkdirSync(path.resolve(__dirname, "dir1", "dir2", "dir3" ), {recursive: true}) // синхр создание папок
//
//
// console.log("START");
// fs.mkdir(path.resolve(__dirname, "dir5" ), (err) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log("Папка создана");
// })
//
// console.log("END");
//
// fs.rmdir(path.resolve(__dirname, "dir1" ), (err) =>{
//     if(err){
//         throw err;
// }
// })


// Так делать нельзя - вложенная асинхронная функция в другую называется ад callback-ов. Нужно делать через fsPromis
// fs.writeFile(path.resolve(__dirname, "test.txt"), "Привет от NODE JS", (err) => {

const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if (err) {
            return reject(err.message);
        }
        resolve()
    }))
}

const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if (err) {
            return reject(err.message);
        }
        resolve()
    }))
}

const readFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: "utf-8" },(err, data) => {
        if (err) {
            return reject(err.message);
        }
        resolve(data)
    }))
}

const removeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.rm(path, (err) => {
        if (err) {
            return reject(err.message);
        }
        resolve(data)
    }))
}


removeFileAsync(path.resolve(__dirname, "test.txt"))
    .then(() => console.log("Файл удалён"))


// writeFileAsync(path.resolve(__dirname, "test.txt"), "Привет, NODE!")
//     .then(()=> appendFileAsync(path.resolve(__dirname, "test.txt")," 123"))
//     .then(()=> appendFileAsync(path.resolve(__dirname, "test.txt")," 456"))
//     .then(()=> appendFileAsync(path.resolve(__dirname, "test.txt")," 789"))
//     .then(()=> readFileAsync(path.resolve(__dirname, "test.txt")))
//     .then(data => console.log(data) )
//     .catch(()=> console.log("err.message"))

// Через переменную окружения передать строку, записать её в файл
// прочитать файл, посчитать кол-во слов в файле и записать их в новый файл count.txt,
// затем удалить первый файл

const text = process.env.TEXT || "";

writeFileAsync(path.resolve(__dirname, "text.txt"), text)
    .then(() =>readFileAsync(path.resolve(__dirname, "text.txt")))
    .then(data => data.split(" ").length)
    .then(count => writeFileAsync(path.resolve(__dirname, "count.txt"), `Количество слов ${count} `))
    .then(()=> removeFileAsync(path.resolve(__dirname, "text.txt")))
    .catch(()=> console.log("err.message"));
