var num1 = new BigInt();
var num2 = new BigInt(128);
var num3 = new BigInt("12345678912233344455566677778888999900000012345678836");
var num4 = new BigInt("-0003847294838293728");

console.log("==[ toString ]========")
console.log("undefined : " + num1.toString());
console.log("128 : " + num2.toString());
console.log("12345678912233344455566677778888999900000012345678836 : " + num3.toString());
console.log("-0003847294838293728 : " + num4.toString());

var cnum1 = new BigInt("111111111111111111111111111111111111111");
var cnum2 = new BigInt("111111111111111111111111111111111111111");
var cnum3 = new BigInt("-111111111111111111111111111111111111111");
var cnum4 = new BigInt("111111111111111111122222222222211111111");
var cnum5 = new BigInt("-111111111111111111122222222222211111111");

console.log("==[ compare ]========")
console.log(cnum1.compare(cnum2) + " :: "+cnum1+" == "+cnum2);
console.log(cnum1.compare(cnum3) + " :: "+cnum1+" > "+cnum3);
console.log(cnum1.compare(cnum4) + " :: "+cnum1+" < "+cnum4);
console.log(cnum3.compare(cnum5) + " :: "+cnum3+" > "+cnum5);
