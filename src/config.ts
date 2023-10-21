import { workspace } from "vscode";

export type ConfigType = {
  autoDetect: boolean;
  includeExtensions: string[];
  ignoreExtensions: string[];
  ignoreDir: string[];
  neededConvertCharset: string[];
  neededReplaceCharset: Map<string, string>;
  showBatchReport: boolean;
  isBatch: boolean
};

function stringToMap(str: string, seq1: string, seq2: string) {
    str.split(seq1)

}

// get user custom config
export function getUserConfig(): ConfigType {
  const config = workspace.getConfiguration("GBK2UTF8");
  const _ignoreExt = config.get<string>("ignoreExtensions");
  const _ignoreDir = config.get<string>("ignoreDir");
  const _includeExt = config.get<string>("includeExtensions");
  const _neededConvertCharset = config.get<string>("neededConvertCharset");
  const _neededReplaceCharset = config.get<string>("neededReplaceCharset");

  return {
    // auto detect file encoding with GBK related.
    autoDetect: config.get<boolean>("autoDetect") as boolean,

    // process only specified file extensions, separated by commas.
    includeExtensions: _includeExt ? _includeExt.split(",") : config.includeExtensions,

    // ignore the specified file extensions, separated by comma.
    ignoreExtensions: _ignoreExt ? _ignoreExt.split(",") : config.ignoreExtensions,

    // ignore the specified directory, separated by comma.
    ignoreDir: _ignoreDir ? _ignoreDir.split(",") : [],

    // Traditional and Simplified Chinese
    neededConvertCharset: _neededConvertCharset ? _neededConvertCharset.split(",") : [],

    // needed replace charset. eg: windows-1252:GB2312,GB2312:GB2312
    neededReplaceCharset: _neededReplaceCharset ? _neededReplaceCharset.split(",").map(pair => pair.split(":")).reduce((map, [key, value]) => map.set(key, value), new Map<string, string>()) : new Map<string, string>(),

    // When batch convert encoding, show convert report result.
    showBatchReport: config.get<boolean>("showBatchReport") as boolean,

    isBatch: false,
  };
}
