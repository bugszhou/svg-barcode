
import renderers from "../renderers";

function getRenderProperties(type = 'svg') {
  return {
    type,
    renderer: renderers.SVGRenderer,
  };
}

export default getRenderProperties;
