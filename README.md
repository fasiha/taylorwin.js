# Taylor windows

In signal processing, a “window” is a sequence of carefully-chosen numbers that, when multiplied by a sequence of data of the same length, shapes the data’s spectrum (frequency domain representation) in some desirable way.

Another word for “windowing” some data with a “window” (or “taper”) is “apodization”.

## Background

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
**Browser** download the minified `dist/taylorwin.min.js` and optionally the sourcemap `dist/taylorwin.js.map`. Add `<script src="taylorwin.min.js"></script>`, which creates a `taylorwin` global function.

## API
The Taylor window, popular in radar circles, has monotonically-decreasing sidelobes, whose level can be tuned. It is specified by three parameters:

1. its length `N`,
2. the number of nearly-constant sidelobes, `nbar`, an integer, and
3. the minimum gap between mainlobe and highest SideLobe Level, `SLL`, in dB.
