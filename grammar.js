module.exports = grammar({
  name: "PINE",

  rules: {
    source_file: ($) => $._expression,
    _expression: ($) =>
      choice(
        $.inch,
        $.foot,
        $.binary_expression
        // ...
      ),

    binary_expression: ($) =>
      choice(
        prec.left(2, seq($._expression, "*", $._expression)),
        prec.left(1, seq($._expression, "+", $._expression))
      ),
    inch: ($) => seq($.number, '"'),
    foot: ($) => seq($.number, "'"),
    number: ($) => /\d+/,
  },
});
