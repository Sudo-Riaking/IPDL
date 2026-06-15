#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ummiscoPath = path.join(__dirname, '../src/data/ummiscoData.ts');
let content = fs.readFileSync(ummiscoPath, 'utf8');

let updateCount = 0;

// For each researcher, update publicationsCount to match publications array
const lines = content.split('\n');
const output = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // Check if this line has publicationsCount
  if (line.includes('publicationsCount:')) {
    // Look ahead for publications array
    let pubCount = 0;
    let foundPubs = false;

    // Search next 20 lines for publications array
    for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].includes('publications: [')) {
        foundPubs = true;
        // Count items in publications array
        let pubLine = lines[j];
        let k = j;
        while (k < lines.length && !pubLine.includes(']')) {
          pubLine += lines[++k];
        }
        // Count { title: entries
        pubCount = (pubLine.match(/\{ title:/g) || []).length;
        break;
      } else if (lines[j].includes('themesDescription:') || lines[j].includes('projects:')) {
        // No publications found, count is 0
        pubCount = 0;
        break;
      }
    }

    // Update the publicationsCount line
    const oldCount = line.match(/publicationsCount: (\d+)/);
    if (oldCount && oldCount[1] != pubCount) {
      output.push(line.replace(/publicationsCount: \d+/, `publicationsCount: ${pubCount}`));
      updateCount++;
    } else {
      output.push(line);
    }
  } else {
    output.push(line);
  }

  i++;
}

fs.writeFileSync(ummiscoPath, output.join('\n'), 'utf8');
console.log(`✅ Updated ${updateCount} publication counts to match actual publications`);
