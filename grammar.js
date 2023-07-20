module.exports = grammar({
  name: "PINE",

  rules: {
    program: ($) => $.statement,
    statement: ($) =>
      choice(
        $.measurement,
        $.arithmetic
        // ...
      ),

    plus: ($) => prec.left(1, seq($.arithmetic, "+", $.arithmetic)),
    minus: ($) => prec.left(1, seq($.arithmetic, "-", $.arithmetic)),
    times: ($) => prec.left(2, seq($.arithmetic, "*", $.arithmetic)),
    divide: ($) => prec.left(2, seq($.arithmetic, "/", $.arithmetic)),

    arithmetic: ($) => choice($.plus, $.minus, $.times, $.divide),

    measurement: ($) => choice($.inch, $.foot),
    inch: ($) => choice(seq($.number, '"'), $.number),
    foot: ($) => seq($.number, "'"),

    number: ($) => choice($.fraction, $.float, $.integer),
    fraction: ($) => /\d+\/\d+/,
    float: ($) => /\d+\.\d+/,
    integer: ($) => /\d+/,
  },
});
