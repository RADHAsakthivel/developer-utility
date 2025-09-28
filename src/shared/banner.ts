import figlet from "figlet";
import chalk from "chalk";

export function showBanner() {
  console.clear();
  const blockLogo = figlet.textSync("DEV CLI", {
      font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  console.log(chalk.red(blockLogo));
  console.log(chalk.yellow(" Developer-utility CLI\n"));
}