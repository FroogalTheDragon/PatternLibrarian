/**
 * Enum representing common crochet stitches.
 * Values are set to their standard pattern abbreviations.
 */
export enum CrochetStitch {
  // Basic Stitches
  Chain = "ch",
  SlipStitch = "slst",
  SingleCrochet = "sc",
  HalfDoubleCrochet = "hdc",
  DoubleCrochet = "dc",
  TrebleCrochet = "tr",
  DoubleTrebleCrochet = "dtr",
  TripleTrebleCrochet = "trtr",

  // Advanced & Texture Stitches
  Bobble = "bobble",
  Popcorn = "popcorn",
  Puff = "puff",
  Cluster = "cluster",
  Shell = "shell",
  VStitch = "v-stitch",
  Picot = "picot",
  Bullion = "bullion",

  // Post Stitches
  FrontPostDoubleCrochet = "fpdc",
  BackPostDoubleCrochet = "bpdc",
  FrontPostTrebleCrochet = "fptr",
  BackPostTrebleCrochet = "bptr",

  // Special Techniques
  MagicRing = "mr",
  FoundationSingleCrochet = "fsc",
  FoundationDoubleCrochet = "fdc",
  InvisibleDecrease = "inv dec",
}

/**
 * Enum representing common knitting stitches and actions.
 * Values represent standard pattern abbreviations.
 */
export enum KnitStitch {
  // Basic Stitches
  Knit = "k",
  Purl = "p",
  Slip = "sl",
  KnitThroughBackLoop = "ktbl",
  PurlThroughBackLoop = "ptbl",

  // Increases
  MakeOneLeft = "m1l",
  MakeOneRight = "m1r",
  KnitFrontAndBack = "kfb",
  PurlFrontAndBack = "pfb",
  YarnOver = "yo",

  // Decreases
  KnitTwoTogether = "k2tog",
  SlipSlipKnit = "ssk",
  PurlTwoTogether = "p2tog",
  SlipSlipPurl = "ssp",
  KnitThreeTogether = "k3tog",
  Slip2Knit1PSSO = "s2kp2", // Central Double Decrease

  // Cables & Texture
  BackCross = "bc",
  FrontCross = "fc",
  Bobble = "mb", // "make bobble"
  PassedStitchOver = "psso",

  // Cast On / Bind Off
  CastOn = "co",
  BindOff = "bo",

  // Other
  Repeat = "rep",
  NoStitch = "x", // Often used in charts
}
