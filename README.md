# Taylor windows
This is a dependency-free ES2015 module lets you create Taylor windows in JavaScript.

In signal processing, a “window” is a sequence of carefully-chosen numbers that, when multiplied by a sequence of data of the same length, shapes the data’s spectrum (frequency domain representation) in some desirable way.

Another word for “windowing” some data with a “window” (or “taper”) is “apodization”.

## Technical background

Perhaps the classic way to motivate windowing data is the problem of separating sinusoids close in frequency. Suppose an instrument is playing A4 (nominally 440 Hz) loudly and another, much softer, instrument is trying to match the note: let the second instrument be 30 dB below the first, and at 443 Hz. If you compute spectrum of the raw clip, you’ll see the loud instrument at 440 Hz, but no sign of the quieter instrument. However, if you window the audio clip with a Taylor window and then find its spectrum, you’ll see the bump at 443 Hz.

![Unwindowed vs Taylor-window of synthetic audio clip](https://github.com/fasiha/taylorwin.js/raw/master/2.png)

The weak 443 Hz sinusoid is lost among the sidelobes of the strong 440 Hz one in the unwindowed spectrum (thin blue, above). With a Taylor window designed to suppress sidelobes to 35 dB below the mainlobe, it has a chance of being noticed. The Matlab code to generate the above:

```matlab
N = 1000; % samples
fs = 1000; % Hz
t = [0 : N - 1]' / fs; % s
x = sin(2 * pi * t * 440) + 0.0316 * sin(2 * pi * t * (440 + 3));

Nfft = 1024 * 8;
f = ([0 : Nfft - 1] / Nfft - 0.5) * fs; % Hz
spectrum = @(x) fftshift(db20(fft(x, Nfft) / N));
plot(f, spectrum(x), f, spectrum(x .* arf.taylorwin(N, 4, -35)))
```

Apart from a canonical example that flagrantly breaks these generalizations, generally windows are

- (nearly) symmetric around their mid-points,
- positive, and
- (very) close to zero near the start and end, and rise to a peak at the middle.

## Install
**Rollup/ES2015** First, the good news: this is a bona fide ES2015 module. Now, the bad news—I’m not really sure how one “installs” ES2015 modules.

**Browser** Download the minified [`dist/taylorwin.min.js`](https://raw.githubusercontent.com/fasiha/taylorwin.js/master/dist/taylorwin.min.js) and optionally the sourcemap [`dist/taylorwin.js.map`](https://raw.githubusercontent.com/fasiha/taylorwin.js/master/dist/taylorwin.js.map). Add `<script src="taylorwin.min.js"></script>`, which creates a `taylorwin` global function.

**Node.js** Use `npm` to install the module: in the shell, run
```
$ npm install --save taylorwin
```
Then, in Node,
```
> const taylorwin = require('taylorwin');
```

## API
The Taylor window, popular in radar circles, has monotonically-decreasing sidelobes, whose level can be tuned. It is specified by three parameters:

1. its length `N`,
2. the number of nearly-constant sidelobes, `nbar`, an integer, and
3. the minimum gap between mainlobe and highest SideLobe Level, `SLL`, in dB. `SLL`’s sign is ignored.

Example: create a 64-point Taylor window with four nearly-constant sidelobes at least 35 dB below the mainlobe:
```
const win = taylorwin(64, 4, 35);
console.log(win);
// [0.5314814093605702, 0.5434274192579622, 0.5670876845563506, 0.6019759550596127,...]
```

## Development
1. Clone this repo: `$ git clone https://github.com/fasiha/taylorwin.js.git`.
1. Install dependencies: `$ npm install` (just development dependencies).
1. Create a new branch: `$ git checkout -b my-new-feature`.
1. Make some changes, probably in `src/taylorwin.js`.
1. Add some tests to `test/taylorwin-test.js`.
1. Run the tests: `$ npm run prebuild && npm run test`. (`prebuild` runs Rollup/Babel to make a UMD JavaScript file for browser/Node).
1. If you come up with something you’d like me to review, fork this repo in Gibhub.com, configure a remote for your already-cloned repo to point to this repo, push to it, and make a pull request. [GitHub Help](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/) has voluminous documentation on how this can work. If this is too much trouble, just [open an issue](https://github.com/fasiha/taylorwin.js/issues) and say your peace.
1. Otherwise, since this is Unlicense/public domain, run `npm run build` and do whatever you want with the resulting `dist/` directory.

## References
The implementation is based on Carrara, Goodman, Majewski, *Spotlight synthetic aperture radar: signal processing algorithms*, Artech House, 1995, specifically Appendix D.2, pages 512–513.

I also tried reading Taylor’s six-decades-new paper to find out more about these mysterious `F` weights, but didn’t get far. That reference is T.T. Taylor, “Design of line-source antennas for narrow beamwidth and low side lobes,” *Transactions of the IRE Professional Group on Antennas and Propagation*, v. 3, no. 1, pp. 16–28, Jan. 1955: [DOI](http://dx.doi.org/10.1109/TPGAP.1955.5720407).


## License
Unlicense/public domain. If it breaks anything, I didn’t do it. Free to use in commercial/closed-source-land. No citation required—in fact, if you use this, keep it to yourself.
