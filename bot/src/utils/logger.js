const chalk = require("chalk");

const success = (message) => {
    console.log(chalk.hex("#4ade80").bold("SUCCESS[bot]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
}

const warning = (message) => {
    console.log(chalk.hex("#fbbf24").bold("WARNING[bot]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
}

const error = (message) => {
    console.log(chalk.hex("#e11d48").bold("ERROR[bot]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
}

const info = (message) => {
    console.log(chalk.hex("#38bdf8").bold("INFO[bot]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
}

const custom = (type) => {
    return {
        success: (message) => {
            console.log(chalk.hex("#4ade80").bold("SUCCESS[" + type + "]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
        },
        warning: (message) => {
            console.log(chalk.hex("#fbbf24").bold("WARNING[" + type + "]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
        },
        error: (message) => {
            console.log(chalk.hex("#e11d48").bold("ERROR[" + type + "]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
        },
        info: (message) => {
            console.log(chalk.hex("#38bdf8").bold("INFO[" + type + "]") + chalk.hex("#ffffff").italic(" » ") + chalk.hex("#a3a3a3").italic("%s"), message)
        }
    }
}

module.exports = {
    success,
    warning,
    error,
    info,
    custom
}