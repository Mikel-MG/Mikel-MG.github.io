export default function renderFigureCaptions(md) {
  md.core.ruler.after("inline", "render_figure_captions", (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== "html_block") return;

      token.content = token.content.replace(
        /<figcaption>([\s\S]*?)<\/figcaption>/g,
        (_, caption) => {
          // re-render caption so markdown-it plugins (e.g. MathJax) are applied
          const rendered = md.renderInline(caption.trim());
          return `<figcaption>${rendered}</figcaption>`;
        },
      );
    });
  });
}
