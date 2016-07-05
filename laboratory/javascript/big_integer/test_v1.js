console.log("==[ toString ]========");
var num1 = new BigInt();
var num2 = new BigInt(128);
var num3 = new BigInt("12345678912233344455566677778888999900000012345678836");
var num4 = new BigInt("-0003847294838293728");

console.log("undefined : " + num1.toString());
console.log("128 : " + num2.toString());
console.log("12345678912233344455566677778888999900000012345678836 : " + num3.toString());
console.log("-0003847294838293728 : " + num4.toString());

console.log("==[ compare ]========");
var cnum1 = new BigInt("111111111111111111111111111111111111111");
var cnum2 = new BigInt("111111111111111111111111111111111111111");
var cnum3 = new BigInt("-111111111111111111111111111111111111111");
var cnum4 = new BigInt("111111111111111111122222222222211111111");
var cnum5 = new BigInt("-111111111111111111122222222222211111111");

console.log(cnum1.compare(cnum2) + " :: "+cnum1+" == "+cnum2);
console.log(cnum1.compare(cnum3) + " :: "+cnum1+" > "+cnum3);
console.log(cnum1.compare(cnum4) + " :: "+cnum1+" < "+cnum4);
console.log(cnum3.compare(cnum5) + " :: "+cnum3+" > "+cnum5);

console.log("==[ add same sign ]========");
var anum2 = new BigInt("22222222222222222222222222222222222222222222222");
var anum7 = new BigInt("777777777777777777777777777777777777777777777777");
var anum2m = new BigInt("-22222222222222222222222222222222222222222222222");
var anum7m = new BigInt("-777777777777777777777777777777777777777777777777");
var anum9m = new BigInt("-9999999999999999999999999999999999999999999999999");

console.log(anum2.add(anum2).toString());
console.log(anum7.add(anum7).toString());
console.log(anum2m.add(anum7m).toString());
console.log(anum9m.add(anum9m).toString());

console.log("==[ sub same sign ]========");
var snum1p = new BigInt("1111");
var snum2p = new BigInt("2222");
var snum2m = new BigInt("-2222");
var snum90a = new BigInt("90001");

console.log(snum2p + " - " + snum1p + " = " + snum2p.sub(snum1p));
console.log(snum2p + " - " + snum2p + " = " + snum2p.sub(snum2p));
console.log(snum2m + " - " + snum2p + " = " + snum2m.sub(snum2p));
console.log(snum1p + " - " + snum2p + " = " + snum1p.sub(snum2p));
console.log(snum90a + " - " + snum2p + " = " + snum90a.sub(snum2p));
console.log(anum7m + ' - ' + anum9m + ' = ' + anum7m.sub(anum9m));

console.log("==[ add/sub different sign ]========");
console.log(snum2p + ' + ' + snum2m + ' = ' + snum2p.add(snum2m));
console.log(snum2m + ' + ' + snum2p + ' = ' + snum2m.add(snum2p));
console.log(snum2p + ' - ' + snum2m + ' = ' + snum2p.sub(snum2m));
console.log(snum2m + ' - ' + snum2p + ' = ' + snum2m.sub(snum2p));

console.log("==[ multiply ]========");
var m1 = new BigInt("12");
var m2 = new BigInt("20");
var m3 = new BigInt("-34");
var m4 = new BigInt("-50");

console.log(m1 + " * " + m1 + " = " + m1.multiply(m1));
console.log(m1 + " * " + m2 + " = " + m1.multiply(m2));
console.log(m2 + " * " + m2 + " = " + m2.multiply(m2));
console.log(m1 + " * " + m4 + " = " + m1.multiply(m4));
console.log(m3 + " * " + m2 + " = " + m3.multiply(m2));
console.log(m3 + " * " + m4 + " = " + m3.multiply(m4));

console.log("==[ factorials ]========");
var fac = 1;
var facBigInt = new BigInt(1);
for(var inx = 1 ; inx <= 100 ; inx++ ){
	fac *= inx; facBigInt = facBigInt.multiply(new BigInt(inx));
	console.log(inx+"!  =>  actual : "+fac+"  / bigint : "+facBigInt.toString());
}





