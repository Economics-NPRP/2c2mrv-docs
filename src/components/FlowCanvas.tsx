"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { flowNodes, flowEdges, EDGE_COLOR, CANVAS, type Tone } from "@/data";
import DiagramNode, { type DiagramNodeType } from "./DiagramNode";
import LaneEdge, { type LaneEdgeType } from "./LaneEdge";
import DetailModal from "./DetailModal";

const nodeTypes = { diagram: DiagramNode };
const edgeTypes = { lane: LaneEdge };

/** Draw order: boxed elements above the long text strips, edges beneath both. */
function nodeZ(kind: string): number {
  return kind === "stage" || kind === "legend" || kind === "rule" ? 2 : 1;
}

export default function FlowCanvas() {
  const [openId, setOpenId] = useState<string | null>(null);

  const nodes = useMemo<Node[]>(
    () =>
      flowNodes.map((model) => {
        const { layout } = model;
        const node: DiagramNodeType = {
          id: model.id,
          type: "diagram",
          position: { x: layout.x, y: layout.y },
          data: { model, onOpen: setOpenId },
          style: {
            width: layout.w,
            ...(layout.kind === "docs" ? {} : { height: layout.h }),
          },
          draggable: false,
          connectable: false,
          selectable: false,
          focusable: false,
          zIndex: nodeZ(layout.kind),
        };
        return node;
      }),
    [],
  );

  const edges = useMemo<Edge[]>(
    () =>
      flowEdges.map((e) => {
        const edge: LaneEdgeType = {
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: e.style.sourceHandle,
          targetHandle: e.style.targetHandle,
          type: "lane",
          data: {
            label: e.label,
            dashed: e.style.dashed,
            centerX: e.style.centerX,
            centerY: e.style.centerY,
            labelDx: e.style.labelDx,
            labelDy: e.style.labelDy,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 13,
            height: 13,
            color: EDGE_COLOR,
          },
          focusable: false,
        };
        return edge;
      }),
    [],
  );

  /**
   * Nodes are non-draggable/non-selectable, and React Flow strips pointer
   * events from nodes unless an onNodeClick handler exists — so clicks are
   * handled here (the in-node <button> covers keyboard activation).
   */
  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const model = flowNodes.find((n) => n.id === node.id);
    if (model?.content) setOpenId(node.id);
  }, []);

  const openModel = openId ? flowNodes.find((n) => n.id === openId) : null;
  const openEntry =
    openModel?.content != null
      ? { ...openModel.content, tone: openModel.layout.tone as Tone }
      : null;

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.06 }}
        minZoom={0.2}
        maxZoom={2.5}
        translateExtent={[
          [-400, -400],
          [CANVAS.width + 400, CANVAS.height + 400],
        ]}
        onNodeClick={handleNodeClick}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: false }}
        className="bg-white"
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.1} color="#e4e4e7" />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>

      <DetailModal entry={openEntry} onClose={() => setOpenId(null)} />
    </div>
  );
}
