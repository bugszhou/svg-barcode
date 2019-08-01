import { json2html as parser } from 'html2json';
import colors from './colors';
import merge from "../help/merge";
import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from "./shared";

const svgns = "http://www.w3.org/2000/svg";

class SVGRenderer {
  constructor(encodings, options) {
    this.svgJson = {
      node: 'element',
      tag: 'svg',
      attr: { style: '' },
      child: [],
    };
    this.barCode = '';
    this.encodings = encodings;
    this.options = options;
  }

  render() {
    let currentX = this.options.marginLeft;

    this.prepareSVG();
    for (let i = 0; i < this.encodings.length; i += 1) {
      const encoding = this.encodings[i];
      const encodingOptions = merge(this.options, encoding.options);

      const group = this.createGroup(currentX, encodingOptions.marginTop);

      this.setGroupOptions(group, encodingOptions);
      //
      this.drawSvgBarcode(group, encodingOptions, encoding);

      this.drawSVGText(group, encodingOptions, encoding);
      console.log('group ==>', group);
      this.svgJson.child.push(group);

      currentX += encoding.width;
    }
    this.barCode = parser(this.svgJson);
  }

  prepareSVG() {
    // Clear the SVG
    while (this.svgJson.child[0]) {
      this.svgJson.child.shift();
    }

    calculateEncodingAttributes(this.encodings, this.options);
    const totalWidth = getTotalWidthOfEncodings(this.encodings);
    const maxHeight = getMaximumHeightOfEncodings(this.encodings);

    const width = totalWidth + this.options.marginLeft + this.options.marginRight;
    this.setSvgAttributes(width, maxHeight);

    if (this.options.background) {
      const rect = this.drawRect(0, 0, width, maxHeight, this.svgJson);
      let color = colors[this.options.background.toLowerCase()];
      if (!color) {
        color = 'white';
        console.warn(`background Not Support ${this.options.background};`);
      }
      rect.attr.style = `${rect.attr.style || ''}fill:${color};`;
    }
  }

  drawSvgBarcode(parent, options, encoding) {
    const binary = encoding.data;

    // Creates the barcode out of the encoded binary
    let yFrom;
    if (options.textPosition == "top") {
      yFrom = options.fontSize + options.textMargin;
    } else {
      yFrom = 0;
    }

    let barWidth = 0;
    let x = 0;
    for (let b = 0; b < binary.length; b += 1) {
      x = b * options.width + encoding.barcodePadding;

      if (binary[b] === "1") {
        barWidth += 1;
      } else if (barWidth > 0) {
        this.drawRect(
          x - options.width * barWidth, yFrom,
          options.width * barWidth, options.height,
          parent,
        );
        barWidth = 0;
      }
    }

    // Last draw is needed since the barcode ends with 1
    if (barWidth > 0) {
      this.drawRect(
        x - options.width * (barWidth - 1),
        yFrom,
        options.width * barWidth,
        options.height,
        parent,
      );
    }
  }

  setSvgAttributes(width, height) {
    const svg = this.svgJson;
    svg.attr.width = `${width}px`;
    svg.attr.height = `${width}px`;
    svg.attr.x = `0px`;
    svg.attr.y = `0px`;
    svg.attr.viewBox = `0 0 ${width} ${height}`;
    svg.attr.xmlns = svgns;
    svg.attr.version = '1.1';
    svg.attr.style = `${svg.attr.style || ''};transform: translate(0,0);`;
  }

  // eslint-disable-next-line
  createGroup(x, y) {
    return {
      node: 'element',
      tag: 'g',
      attr: { transform: `translate(${x}, ${y})` },
      child: [],
    };
  }
  // eslint-disable-next-line
  setGroupOptions(group, options) {
    if (!group.attr) {
      group.attr = {};
    }
    let color = colors[options.lineColor.toLowerCase()];
    if (!color) {
      color = 'black';
      console.warn(`lineColor Not Support ${options.lineColor};`);
    }
    group.attr.style = `${group.attr.style || ''};fill:${color};`;
  }

  drawRect(x, y, width, height, parent) {
    const rect = {
      node: 'element',
      tag: 'rect',
      attr: { style: '' },
    };
    rect.attr.x = x;
    rect.attr.y = y;
    rect.attr.width = width;
    rect.attr.height = height;

    if (Array.isArray(parent.child)) {
      parent.child.push(rect);
    }

    return rect;
  }

  drawSVGText(parent, options, encoding) {
    const textElem = {
      node: 'element',
      tag: 'text',
      attr: { style: '' },
      text: '',
      child: [],
    };

    // Draw the text if displayValue is set
    if (options.displayValue) {
      let x,
        y;
      textElem.attr.style += `;font:${options.fontOptions} ${options.fontSize}px ${options.font};`;

      if (options.textPosition == "top") {
        y = options.fontSize - options.textMargin;
      } else {
        y = options.height + options.textMargin + options.fontSize;
      }

      // Draw the text in the correct X depending on the textAlign option
      if (options.textAlign == "left" || encoding.barcodePadding > 0) {
        x = 0;
        textElem.attr['text-anchor'] = `start`;
      } else if (options.textAlign == "right") {
        x = encoding.width - 1;
        textElem.attr['text-anchor'] = `end`;
      }
      // In all other cases, center the text
      else {
        x = encoding.width / 2;
        textElem.attr['text-anchor'] = `middle`;
      }

      textElem.attr.x = x;
      textElem.attr.y = y;

      textElem.child.push({
        node: 'text',
        tag: '',
        text: encoding.text,
      });

      parent.child.push(textElem);
    }
  }
}

export default SVGRenderer;
