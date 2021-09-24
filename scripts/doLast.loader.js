const fs = require("fs");

const webpackFilePath = "node_modules/react-native/react.gradle";
const fileLoader = `moveFunc.curry("drawable-ldpi").call()`;
// const headerFileLoader = 149;

const beforeCode = `
            doFirst {
                jsBundleDir.deleteDir()
                jsBundleDir.mkdirs()
                resourcesDir.deleteDir()
                resourcesDir.mkdirs()
                jsIntermediateSourceMapsDir.deleteDir()
                jsIntermediateSourceMapsDir.mkdirs()
                jsSourceMapsDir.deleteDir()
                jsSourceMapsDir.mkdirs()
            }`

const _2addCode = `
            doLast {
                def moveFunc = { resSuffix ->
                    File originalDir = file("$buildDir/generated/res/react/release/\${resSuffix}");
                    if (originalDir.exists()) {
                        File destDir = file("$buildDir/../src/main/res/\${resSuffix}");
                        ant.move(file: originalDir, tofile: destDir);
                    }
                }
                moveFunc.curry("drawable-ldpi").call()
                moveFunc.curry("drawable-mdpi").call()
                moveFunc.curry("drawable-hdpi").call()
                moveFunc.curry("drawable-xhdpi").call()
                moveFunc.curry("drawable-xxhdpi").call()
                moveFunc.curry("drawable-xxxhdpi").call()
                moveFunc.curry("raw").call()
            }`
;

const gradle = fs.readFileSync(webpackFilePath, "utf8");
const index = gradle.indexOf(fileLoader);
if (index > 0) {
  console.log("move func found on react gradle");
  return;
}

const index_to_add = gradle.indexOf(beforeCode)
if(index_to_add < 0) {
  console.log("index not found on file");
  return;
}

try {
  fs.writeFileSync(webpackFilePath, `${gradle.slice(0, index_to_add + beforeCode.length + 1)}${_2addCode}${gradle.slice(index_to_add + beforeCode.length + 1)}`);
  console.log("script modified")
} catch (error) {
  console.error(error);
}
