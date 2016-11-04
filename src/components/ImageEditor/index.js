import React, { Component, PropTypes } from 'react';
import AvatarEditor from 'react-avatar-editor';

export default class ImageEditor extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
  };

  static state = { scale: 1, preview: null };

  constructor(props) {
    super(props);
    this.getPreview = this.getPreview.bind(this);
    this.handleScale = this.handleScale.bind(this);

    this.state = { scale: 1, preview: null };
  }

  getPreview() {
    const img = this.ImageEditor.getImage().toDataURL();
    this.setState({ preview: img });
  }

  handleScale(e) {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  }

  render() {
    const { image } = this.props;

    return (
      <div>
        <AvatarEditor
          ref={(element) => { this.ImageEditor = element; }}
          image={image}
          width={250}
          height={250}
          border={0}
          style={{ borderRadius: '50%' }}
          scale={parseFloat(this.state.scale)}
          onSave={this.getPreview}
        />
        <div>
          Zoom:
          <input
            name="scale"
            type="range"
            onChange={this.handleScale}
            min="1"
            max="2"
            step="0.01"
            defaultValue="1"
          />
          <input type="button" onClick={this.getPreview} value="Preview" />
          <img
            src={this.state.preview}
            style={{ borderRadius: '50%', width: '250px', height: '250px' }}
            alt="preview"
          />
        </div>
      </div>
    );
  }
}
