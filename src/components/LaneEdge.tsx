"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import { EDGE_COLOR } from "@/data";

export interface LaneEdgeData extends Record<string, unknown> {
  label?: string;
  dashed?: boolean;
  /** Force the middle segment into a fixed lane (mirrors the .drawio waypoints). */
  centerX?: number;
  centerY?: number;
  /** Shift the label off the path midpoint (px, canvas space). */
  labelDx?: number;
  labelDy?: number;
}

export type LaneEdgeType = Edge<LaneEdgeData, "lane">;

export default function LaneEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<LaneEdgeType>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 6,
    centerX: data?.centerX,
    centerY: data?.centerY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: EDGE_COLOR,
          strokeWidth: 2,
          strokeDasharray: data?.dashed ? "7 5" : undefined,
        }}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX + (data?.labelDx ?? 0)}px, ${labelY + (data?.labelDy ?? 0)}px)`,
              background: "rgba(255,255,255,0.95)",
              padding: "1px 5px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 500,
              color: "#3f3f46",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
