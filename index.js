let inquirer = require('inquirer');
let fs = require('fs');

inquirer
    .prompt([
        {
            type: "input",
            message: "Please add title of your project",
            name: "title"
        },
        {
            type: "input",
            message: "Please add a description of your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Please add instructions for installation",
            name: "install"
        },
        {
            type: "input",
            message: "Please add usage for the project",
            name: "usage"
        },
        {
            type: "input",
            message: "Please add contributions of your project:",
            name: "contribution"
        },
        {
            type: "input",
            message: "Please add testing info of your project",
            name: "testing"
        },
        {
            type: "input",
            message: "What is your GitHub Username:",
            name: "github"
        },
        {
            type: "input",
            message: "What is your email address:",
            name: "email"
        },
        {
            type: "list",
            message: "License that this project falls under",
            name: "license",
            choices: [
                "MIT License",
                "Code Project Open License (CPOL)",
                "Common Development and Distribution License (CDDL)",
                "Microsoft Public License (Ms-PL)",
                "Mozilla Public License 1.1 (MPL 1.1)",
                "Common Public License Version 1.0 (CPL)",
                "Eclipse Public License 1.0",
                "Apache License, Version 2.0"
            ]
        }
    ])
    .then((res) => {
        console.log("Create README");
        createREADME(res);

    })
    .catch((err) => {
        console.log(err);
    })


function createREADME(input) {
    let title;
    let description;
    const dHead = "## Description";
    let toc;
    const tocHead = "## Table of Contents";
    let install;
    const iHead = "## Installation";
    let usage;
    const uHead = "## Usage";
    let contribution;
    const cHead = "## Contribution";
    let test;
    const tHead = "## Tests";
    let licence = input.license;
    const lHead = "## License";
    let questions;
    const qHead = "## Questions";
    let fullREADME = [];

    // Adding Title
    if (input.title == '') {
        title = '# TITLE';
    } else {
        title = `# ${input.title}`;
    }
    fullREADME.push(title);


    //license badge
    let badge = `![](https://img.shields.io/badge/license-${licence.replace(/ /g, "%20")}-blue?style=flat-square)`;
    fullREADME.push(badge);


    // Adding description
    if (input.description == '') {
        description = `${dHead}\n Add project description.`;
    } else {
        description = `${dHead}\n${input.description}`;
    }
    fullREADME.push(description);


    //ToC
    toc = `${tocHead}\n* [Installation](#installation)\n* [Usage](#usage)\n* [Contribution](#contribution)\n* [Tests](#tests)\n* [License](#license)\n* [Questions](#questions)\n`;
    fullREADME.push(toc);


    //installation instructions
    fullREADME.push(`${iHead}`);

    install = input.install.split(',').map(item => {
        return `${item.trim()}`;
    });

    for (var i = 0; i < install.length; i++) {
        fullREADME.push(`${i + 1}. ${install[i]}`);
    }


    //Usage
    if (input.usage == '') {
        usage = `\n${uHead}\n Add project usage.`;
    } else {
        usage = `\n${uHead}\n${input.usage}`;
    }
    fullREADME.push(usage);


    // Contributing
    if (input.contribution == '') {
        contribution = `\n${cHead}\n Add project contriburtion information.`;
    } else {
        contribution = `\n${cHead}\n${input.contribution}`;
    }
    fullREADME.push(contribution);


    //Tests
    if (input.testing == '') {
        test = `\n${tHead}\n Add project testing information.`;
    } else {
        test = `\n${tHead}\n${input.testing}`;
    }
    fullREADME.push(test);


    //License
    licence = `\n${lHead}\nCovered under the ${input.license}.`;
    fullREADME.push(licence);


    //Questions
    questions = `\n${qHead}\nFor additional questions, please visit GitHub at [${input.github}](https://github.com/${input.github}), or email at ${input.email}.`;
    fullREADME.push(questions);


    //created README Array
    const README = fullREADME.join('\n');


    //README
    fs.writeFile("./sample/README-sample.md", README, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("Successfully created README");
        }
    });
}
