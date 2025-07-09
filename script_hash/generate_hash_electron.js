const fs = require("fs")
const path = require("path")
const crypto = require('crypto')

const getFileChecksum = (filePath) => {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha256')
		const input = fs.createReadStream(filePath)
		input.on('error', reject)
		input.on('data', (chunk) => hash.update(chunk))
		input.on('close', () => {
			resolve(hash.digest('hex'))
		})
	})
}

const getAllFiles = (dirPath, arrayOfFiles) => {
	files = fs.readdirSync(dirPath)

	arrayOfFiles = arrayOfFiles || []

	files.forEach(async (file) => {
		const filePath = path.join(__dirname, dirPath, "/", file)
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
		} else {
			arrayOfFiles.push({
				fileName: filePath,
				size: fs.statSync(filePath).size,
			})
		}
	})

	return arrayOfFiles
}

const result = getAllFiles("./files").map(file => {
	return getFileChecksum(file.fileName).then((data) => {
		file.fileName = file.fileName.split(path.join(__dirname, "./files/")).pop()
		file.hash = data
		return file
	})
})

Promise.all(result).then((data) => {
	fs.writeFile("./files.json", JSON.stringify(data), (err) => {
		if (err) throw err
		console.log(data.length)
		console.log('The file has been saved!')
	})
})
