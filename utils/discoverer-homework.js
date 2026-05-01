export function sumOfSquares(discovererNumberList) {
  let discovererSquareSum = 0;

  for (const discovererNumber of discovererNumberList) {
    discovererSquareSum += discovererNumber * discovererNumber;
  }

  return discovererSquareSum;
}

export function getSumAndMultOfArray(discovererNumberList) {
  let discovererSum = 0;
  let discovererMult = 1;

  for (const discovererNumber of discovererNumberList) {
    discovererSum += discovererNumber;
    discovererMult *= discovererNumber;
  }

  return {
    sum: discovererSum,
    mult: discovererMult
  };
}

export function diff(firstDiscovererList, secondDiscovererList) {
  const secondDiscovererSet = new Set(secondDiscovererList);
  const uniqueDiscovererItems = [];

  for (const discovererItem of firstDiscovererList) {
    if (!secondDiscovererSet.has(discovererItem)) {
      uniqueDiscovererItems.push(discovererItem);
    }
  }

  return uniqueDiscovererItems;
}

export function sort(discovererSentence) {
  return discovererSentence
    .split(" ")
    .map((discovererWord) => discovererWord.trim())
    .filter((discovererWord) => discovererWord !== "")
    .sort((firstWord, secondWord) =>
      firstWord.localeCompare(secondWord, "ru", { sensitivity: "base" })
    )
    .join(" ");
}

export function collectOpenBaseNames(openBaseIdList, pioneerBaseNameById) {
  const baseQueue = [...openBaseIdList];
  const openBaseNameList = [];
  let currentBaseId;

  do {
    currentBaseId = baseQueue.shift();

    if (currentBaseId !== undefined) {
      openBaseNameList.push(pioneerBaseNameById[currentBaseId]);
    }
  } while (currentBaseId !== undefined);

  return openBaseNameList;
}
