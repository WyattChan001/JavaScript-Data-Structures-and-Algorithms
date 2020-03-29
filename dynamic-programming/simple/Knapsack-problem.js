/**
 * 背包问题
 * 问题：给定一个固定大小、能够携重量 W 的背包，
 * 以及一组有价值和重量的物品，找出一个最佳解决
 * 方案，使得装入背包的物品总重量不超过W，且总价值最大。
 */

/**
 * 例子如下：
 *  -----------------------------
 *   物品  |    重量   |   价值
 * ------------------------------
 *     1   |    2     |    3
 * ------------------------------
 *     2   |    3     |    4
 * ------------------------------
 *     3   |    4     |    5
 * ------------------------------
 * 考虑背包能够携带的重量只有 5。对于这个例子，
 * 我们可以说最佳解决方案是往背包里装入物品 1 和物品 2。
 * 这样，总重量为 5，总价值为 7。
 */

/**
 * 问题版本：0-1 版本
 * 解题思路：
 *
 * @param {*} capacity  代表背包能携带的重量
 * @param {*} weights   可选物品重量数组
 * @param {*} values    物品价值数组【与重量数组对应】
 * @param {*} n         可选物品数量
 */
function knapSack(capacity, weights, values, n) {
  const kS = [];
  for (let i = 0; i <= n; i++) {    // {1} 初始化将用于寻找解决方案的矩阵【忽略矩阵的第一列和第一行】
    kS[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {   // 迭代数组中每个可用的项
      if (i === 0 || w === 0) {
        // {2} 索引为0赋初值 0，只处理索引不为 0 的列和行
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) {     // {3} 物品 i 的重量必须小于约束
        /**
         * ★★★★
         * a 的值为求解新值的关系式
         * values[i - 1]：当前重量为 weights[i - 1] 的物品的价值
         * kS[i - 1][w - weights[i - 1]]：
         * [i-1](可选物品数量比当前少一个)时，
         * [w - weights[i - 1]](拥有承受剩余重量的最大价值)
         */
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];    
        const b = kS[i - 1][w];     // 重量为[w]的背包在有[i-1]个可选物品时价值
        kS[i][w] = a > b ? a : b; // {4} max(a,b)
      } else {
        kS[i][w] = kS[i - 1][w]; // {5} 用之前的值 【总重量超出背包能够携带的重量】
      }
    }
  }
  findValues(n, capacity, kS, weights, values); // {6} 增加的代码
  return kS[n][capacity]; // {7}
}

const values = [3,4,5],
weights = [2,3,4],
capacity = 5,
n = values.length;
console.log(knapSack(capacity, weights, values, n)); // 输出 7 

/**
 * 附加函数：找出构成解决方案的物品
 * @param {*} n 可选物品数量
 * @param {*} capacity 代表背包能携带的重量
 * @param {*} kS 找解决方案的矩阵
 * @param {*} weights 可选物品重量数组
 * @param {*} values 物品价值数组【与重量数组对应】
 */
function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log("构成解的物品：");
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(
        `物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]}`
      );
      i--;
      console.log(kS[i][k])
    //   k -= kS[i][k];    //打印出物品后求出剩余的重量
      k -= weights[i]     //原书此处原句为以上注释的代码，似乎有误，这里更正
      console.log(k)
    } else {
      i--;
    }
  }
}
