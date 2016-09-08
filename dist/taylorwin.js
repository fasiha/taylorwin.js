(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.taylorwin = factory());
}(this, (function () { 'use strict';

function prod(v) {
  var x = 1;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elt = _step.value;

      x *= elt;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return x;
};
function sum(v) {
  var x = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var elt = _step2.value;

      x += elt;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
  return x;
}
function range0f(n, f) {
  return Array.from(Array(n), function (_, i) {
    return f(i);
  });
}
function range1(n) {
  return range0f(n, function (x) {
    return x + 1;
  });
}
function range1f(n, f) {
  return range0f(n, function (x) {
    return f(x + 1);
  });
}

function taylorwin(N, nbar, sll) {
  var B = Math.pow(10, Math.abs(sll) / 20);
  var A = Math.log(B + Math.sqrt(B * B - 1)) / Math.PI;
  var σ2 = nbar * nbar / (A * A + (nbar - 0.5) * (nbar - 0.5));

  var fNumerator = function fNumerator(m) {
    return 0.5 * Math.pow(-1, m + 1) * prod(range1f(nbar - 1, function (i) {
      return 1 - m * m / σ2 / (A * A + (i - 0.5) * (i - 0.5));
    }));
  };
  var fDenominator = function fDenominator(m) {
    return prod(range1(nbar - 1).filter(function (x) {
      return x != m;
    }).map(function (j) {
      return 1 - m * m / (j * j);
    }));
  };
  var F = range1f(nbar - 1, function (m) {
    return fNumerator(m) / fDenominator(m);
  });

  return range0f(N, function (n) {
    return 1 + 2 * sum(F.map(function (Fm, m_1) {
      return Fm * Math.cos(2 * Math.PI * (m_1 + 1) / N * (n - 0.5 * N + 0.5));
    }));
  });
}

return taylorwin;

})));
//# sourceMappingURL=taylorwin.js.map
