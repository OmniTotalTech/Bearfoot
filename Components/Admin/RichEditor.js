import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-import-html";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent()),
    });
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  render() {
    return (
      <div className="editorContainer">
        <button
          className="button bg-red-500 p-4 rounded m-4"
          onClick={this.onUnderlineClick}
        >
          Underline
        </button>
        <button
          className="button bg-red-500 p-4 rounded m-4"
          onClick={this.onBoldClick}
        >
          <b>Bold</b>
        </button>
        <button
          className="button bg-red-500 p-4 rounded m-4"
          onClick={this.onItalicClick}
        >
          <em>Italic</em>
        </button>{" "}
        <div className="editors bg-white m-4 p-4">
          <Editor
            className="bg-white m-4 p-4"
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
        <pre>{this.state.editorContentHtml}</pre>
      </div>
    );
  }
}

export default PageContainer;
