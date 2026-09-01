"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { CSSProperties } from "react";
import { TONES, type FlowNodeModel } from "@/data";

export interface DiagramNodeData extends Record<string, unknown> {
  model: FlowNodeModel;
  onOpen: (id: string) => void;
}

export type DiagramNodeType = Node<DiagramNodeData, "diagram">;

const HIDDEN_HANDLE: CSSProperties = {
  opacity: 0,
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: "none",
  background: "transparent",
  pointerEvents: "none",
};

/** Invisible connection points; ids referenced by EDGE_STYLE in the data layer. */
function StageHandles() {
  return (
    <>
      <Handle type="source" position={Position.Top} id="t" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="target" position={Position.Top} id="t" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="b" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="target" position={Position.Bottom} id="b" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="b2" style={{ ...HIDDEN_HANDLE, left: "75%" }} isConnectable={false} />
      <Handle type="target" position={Position.Top} id="t2" style={{ ...HIDDEN_HANDLE, left: "85%" }} isConnectable={false} />
      <Handle type="source" position={Position.Left} id="l" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="l" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="r" style={HIDDEN_HANDLE} isConnectable={false} />
      <Handle type="target" position={Position.Right} id="r" style={HIDDEN_HANDLE} isConnectable={false} />
    </>
  );
}

export default function DiagramNode({ data }: NodeProps<DiagramNodeType>) {
  const { model, onOpen } = data;
  const { layout, label, content } = model;
  const tone = TONES[layout.tone];
  const clickable = Boolean(content);
  const ariaLabel = content ? `${content.title}, details` : undefined;

  /* ---------- text-only kinds: title, subtitle, phase, note, docs ---------- */
  if (
    layout.kind === "title" ||
    layout.kind === "subtitle" ||
    layout.kind === "phase" ||
    layout.kind === "note" ||
    layout.kind === "docs"
  ) {
    const textStyle: CSSProperties = {
      width: "100%",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent:
        layout.align === "right" ? "flex-end" : layout.align === "left" ? "flex-start" : "center",
      textAlign: layout.align ?? "center",
      fontSize: layout.fontSize ?? 12,
      fontWeight: layout.bold ? 700 : 400,
      color: layout.textColor ?? "#1f2937",
      lineHeight: 1.45,
      whiteSpace: layout.kind === "docs" ? "normal" : "pre-line",
    };
    if (!clickable) {
      return <div style={textStyle}>{label}</div>;
    }
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => onOpen(model.id)}
        style={textStyle}
        className="group cursor-pointer rounded-sm px-0.5 transition-colors hover:bg-black/[.045] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        <span className="decoration-dotted underline-offset-4 group-hover:underline">{label}</span>
      </button>
    );
  }

  /* ---------- boxed kinds: stage, legend, rule ---------- */
  const boxStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: layout.kind === "legend" ? "2px 8px" : "6px 8px",
    fontSize: layout.fontSize ?? 12,
    fontWeight: layout.bold ? 700 : 400,
    lineHeight: 1.35,
    whiteSpace: "pre-line",
    background: tone.fill,
    color: tone.text,
    border: `${layout.kind === "legend" ? 1 : 1.5}px ${layout.dashed ? "dashed" : "solid"} ${tone.stroke}`,
    borderRadius: layout.kind === "legend" ? 8 : 10,
    position: "relative",
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => clickable && onOpen(model.id)}
      style={boxStyle}
      className={
        clickable
          ? "cursor-pointer shadow-sm transition-[box-shadow,transform] duration-100 hover:-translate-y-px hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          : "cursor-default"
      }
    >
      {layout.kind === "stage" && <StageHandles />}
      {content?.stage && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 3,
            right: 6,
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: layout.tone === "retired" ? "#d4d4d8" : tone.stroke,
            opacity: 0.9,
          }}
        >
          {content.stage}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}
