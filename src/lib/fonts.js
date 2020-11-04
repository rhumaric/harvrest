export function supportsFontLoading() {
  return 'fonts' in document;
}

export function shouldLoadFonts() {
  return !(
    navigator.connection &&
    (navigator.connection.saveData ||
      navigator.connection.effectiveType == 'slow-2g' ||
      navigator.connection.effectiveType == '2g')
  );
}

export function loadFonts() {
  var font = new FontFace(
    'Bariol',
    "url(fonts/bariol_regular-webfont.woff2) format('woff2'), url(fonts/bariol_regular-webfont.woff) format('woff')"
  );

  var fontBold = new FontFace(
    'Bariol',
    "url(fonts/bariol_bold-webfont.woff2) format('woff2'), url(fonts/bariol_bold-webfont.woff) format('woff')",
    { weight: '700' }
  );

  Promise.all([font.load(), fontBold.load()]).then(function(loadedFonts) {
    // Render them at the same time
    loadedFonts.forEach(function(font) {
      document.fonts.add(font);
    });
    document.documentElement.classList.add('fonts-loaded');
  });
}
