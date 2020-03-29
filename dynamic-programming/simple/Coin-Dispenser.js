/**
 * 最少硬币找零问题
 * 问题：最少硬币找零问题是给出要找零的钱数，
 * 以及可用的硬币面额 d1, …, dn及其数量，找
 * 到所需的最少的硬币个数。
 */

/**
 * 例如，美国有以下面额（硬币）：d1 = 1，d2 = 5，d3 = 10，d4 = 25。
 * 如果要找 36 美分的零钱，我们可以用 1 个 25 美分、1 个 10 美分和 1 个便士（1 美分）。
 */

/**
 * 解决问题的思路：最少硬币找零的解决方案是找到 n 所需的
 * 最小硬币数。但要做到这一点，首先得找到对每个x < n 的解。
 * 然后，我们可以基于更小的值的解来求解。
 * @param {*} coins 代表问题中的面额，本题中是[1, 5, 10, 25]
 * @param {*} amount 要找零的钱数
 * 
 * 个人算法理解：
 * 1、基于硬币的面值，计算每个数值需要个该类型的硬币数数量
 * 2、所以第一步，对硬币面值进行遍历计算，题干的输入面额作为递归函数外的变量
 * 3、第二步，确定临界值，即递归函数的跳出条件
 * 4、第三步，返回值是一个数组，将数组进行比较，如果没有对应的面额数组，直接存入
 * 5、否则，通过比较新的面额数组与已存在数组，有优势则存入缓存数组中
 */
function minCoinChange(coins, amount) {
  const cache = []; // {1} 记忆已经计算的值
  const makeChange = value => {
    // {2}
    // console.log(!value)
    if (!value) {
      // {3}  若 amount 不为正（< 0），就返回空数组
      return [];
    }
    if (cache[value]) {
      // {4} 若结果已缓存，则直接返回结果
      return cache[value];
    }
    let min = [];
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      // {5} 对每个面额，都计算 newAmount（行{6}）的值
      const coin = coins[i];
      newAmount = value - coin; // {6} 计算 newAmount 的值
      if (newAmount >= 0) {
          console.log('每次计算的值 ', newAmount)
        newMin = makeChange(newAmount); // {7}
      }
      if (
        newAmount >= 0 && // {8} 判断 newAmount 是否有效，minValue （最少硬币数）是否是最优解
        (newMin.length < min.length - 1 || !min.length) && // {9}
        (newMin.length || !newAmount) // {10}
      ) {
        min = [coin].concat(newMin); // {11} 一个比之前更优的答案
        console.log("new Min " + min + " for " + value);
      }
    }
    console.log(typeof newMin, ' ', newMin)
    console.log("value值：" + value, " min值：" + min)
    console.log(min)
    return (cache[value] = min); // {12} 返回包含用来找零的各个面额的硬币数量（最少硬币数）
  };
  console.log(cache)
  return makeChange(amount); // {13} amount 作为参数传入
}
console.log(minCoinChange([1, 5, 10, 25], 36)); 