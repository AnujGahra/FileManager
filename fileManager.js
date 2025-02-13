#!/usr/bin/env node
// sebang
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import chalk from "chalk";

import {
  createFolder,
  createFile,
  writeToFile,
  deleteFile,
  deleteFolder,
  listItems,
} from "./fs.js";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function menu() {
    console.clear();
  console.log(chalk.blue.bold(`\n📂 File system manager`));

  const options = [
    "Create Folder",
    "Create File",
    "Write to File",
    "Delete File",
    "Delete Folder",
    "List Items",
    "Exit",
  ];

  options.forEach((opt, i) =>
    console.log(chalk.yellow(`${i + 1}`) + chalk.white(` ${opt}`))
  );

  const answer = await rl.question(chalk.cyan("\nSelect option: "));

  switch (answer) {
    case "1":
      const folderPath = await rl.question(chalk.cyan("Folder path: "));
      await createFolder(folderPath);
      console.log(chalk.green("✅ Folder created."));
      break;
    case "2":
      const filepath = await rl.question(chalk.cyan("File path: "));
      const initialContent = await rl.question(chalk.cyan("Initial content: "));
      await createFile(filepath, initialContent);
      console.log(chalk.green("✅ File created."));
      break;
    case "3":
      const appendFilepath = await rl.question(chalk.cyan("File path: "));
      const appendInitialContent = await rl.question(
        chalk.cyan("Initial content: ")
      );
      await writeToFile(appendFilepath, `\n${appendInitialContent}`);
      console.log(chalk.green("✅ File content added."));
      break;
    case "4":
      const deleteFilePath = await rl.question(chalk.cyan("File to delete: "));
      await deleteFile(deleteFilePath);
      console.log(chalk.red("✅ File deleted."));
      break;
    case "5":
      const deleteFolderPath = await rl.question(
        chalk.cyan("Folder to delete: ")
      );
      await deleteFolder(deleteFolderPath);
      console.log(chalk.red("✅ Folder deleted."));
      break;
    case "6":
      const listPath = await rl.question(
        chalk.cyan("Folder path (Enter for current): ")
      );
      const items = await listItems(listPath || "./");
      console.log(chalk.blue("\nContents: "));
      items.forEach((item) => {
        const icon = item.type === "folder" ? "📂" : "📄";
        console.log(`${icon} ${chalk.yellow(item.name)}`, chalk.gray(`${item.path}`));

      });
      break;
    case "7":
      rl.close();
      return;
    default:
      console.log(chalk.red('⚠️ Invalid option'))
  }

  await rl.question(chalk.gray('\nPress ENTER to continue...'));

  menu();
}

menu();


