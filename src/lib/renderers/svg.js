import { json2html as parser } from 'html-parser-util';
import merge from "../help/merge.js";
import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from "./shared.js";

var svgns = "http://www.w3.org/2000/svg";

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
    var currentX = this.options.marginLeft;

    this.prepareSVG();
    for (let i = 0; i < this.encodings.length; i++) {
      var encoding = this.encodings[i];
      var encodingOptions = merge(this.options, encoding.options);

      var group = this.createGroup(currentX, encodingOptions.marginTop, this.options.useTranslate);

      this.setGroupOptions(group, encodingOptions);
      //
      this.drawSvgBarcode(group, encodingOptions, encoding);

      this.drawSVGText(group, encodingOptions, encoding);

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
    var totalWidth = getTotalWidthOfEncodings(this.encodings);
    var maxHeight = getMaximumHeightOfEncodings(this.encodings);

    // var width = totalWidth + this.options.marginLeft + this.options.marginRight;
    var width = totalWidth;
    if (this.options.useTranslate) {
      width = totalWidth + this.options.marginLeft + this.options.marginRight;
    }
    this.setSvgAttributes(width, maxHeight);

    if (this.options.background) {
      let rect = this.drawRect(0, 0, width, maxHeight, this.svgJson);
      rect.attr.style = (rect.attr.style || '') + `fill:${this.options.background};`;
    }
  }

  drawSvgBarcode(parent, options, encoding) {
    var binary = encoding.data;

    // Creates the barcode out of the encoded binary
    var yFrom;
    if (options.textPosition == "top") {
      yFrom = options.fontSize + options.textMargin;
    }
    else {
      yFrom = 0;
    }

    var barWidth = 0;
    var x = 0;
    for (var b = 0; b < binary.length; b++) {
      x = b * options.width + encoding.barcodePadding;

      if (binary[b] === "1") {
        barWidth++;
      } else if (barWidth > 0) {
        this.drawRect(x - options.width * barWidth + parent.x, yFrom, options.width * barWidth, options.height, parent);
        barWidth = 0;
      }
    }

    // Last draw is needed since the barcode ends with 1
    if (barWidth > 0) {
      this.drawRect(x - options.width * (barWidth - 1) + parent.x, yFrom, options.width * barWidth, options.height, parent);
    }
  }

  setSvgAttributes(width, height) {
    var svg = this.svgJson;
    svg.attr.width = `${width}px`;
    svg.attr.height = `${width}px`;
    svg.attr.x = `0px`;
    svg.attr.y = `0px`;
    svg.attr.viewBox = `0 0 ${width} ${height}`;
    svg.attr.xmlns = svgns;
    svg.attr.version = '1.1';
    // svg.attr.style = (svg.attr.style || '') + ';transform: translate(0,0);';
  }

  createGroup(x, y, useTranslate) {
    if (useTranslate) {
      return {
        node: 'element',
        tag: 'g',
        x: 0,
        y: 0,
        attr: { transform: `translate(${x}, ${y})` },
        child: [],
      };
    }
    // 支付宝小程序不支持transform: `translate(${x}, ${y})`
    return {
      node: 'element',
      tag: 'g',
      x,
      y,
      attr: {},
      child: [],
    };
  }

  setGroupOptions(group, options) {
    if (!group.attr) {
      group.attr = {};
    }
    group.attr.style = (group.attr.style || '') + `;fill:${options.lineColor};`;
  }

  drawRect(x, y, width, height, parent) {
    var rect = {
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
    var textElem = {
      node: 'element',
      tag: 'text',
      attr: { style: '' },
      text: '',
      child: [],
    };

    // Draw the text if displayValue is set
    if (options.displayValue) {
      var x, y;
      textElem.attr.style += `;font:${options.fontOptions} ${options.fontSize}px ${options.font};`;

      if (options.textPosition == "top") {
        y = options.fontSize - options.textMargin;
      }
      else {
        y = options.height + options.textMargin + options.fontSize;
      }

      // Draw the text in the correct X depending on the textAlign option
      if (options.textAlign == "left" || encoding.barcodePadding > 0) {
        x = 0;
        textElem.attr['text-anchor'] = `start`;
      }
      else if (options.textAlign == "right") {
        x = encoding.width - 1;
        textElem.attr['text-anchor'] = `end`;
      }
      // In all other cases, center the text
      else {
        x = encoding.width / 2;
        textElem.attr['text-anchor'] = `middle`;
      }

      textElem.attr.x = x + parent.x;
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
