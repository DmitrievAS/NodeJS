// 1. Readable чтение
// 2. Writable запись
// 3. Duplex - для чтения и записи Readable + Writable
// Transform - Такой же как Duplex, но может изменить данные по мере чтения

const fs = require("fs")
const path = require("path")

const stream = fs.createReadStream(path.resolve(__dirname, "test2.txt"))

//Один chunk по дефолту равен 64кб.
stream.on("data", (chunk)=>{
    console.log(chunk);
})
stream.on("end", ()=> console.log("Закончили читать"))
stream.on("open", ()=> console.log("Начали читать"))
stream.on("error", (e)=> console.log(e))

const writableStream = fs.createWriteStream(path.resolve(__dirname, "test2.txt"))
for (let i = 0; i <20; i++ ) {
    writableStream.write(i + '\n');
}

// Методы для закрытия Streama
writableStream.end()
writableStream.close()
writableStream.destroy()
writableStream.on("error")

http.createServer((req, res,) => {
    const stream = fs.createReadStream(path.resolve(__dirname, "test.txt"))
    // Стрим закончит читать раньше, чем пользователь скачает
    stream.pipe(res)
})


