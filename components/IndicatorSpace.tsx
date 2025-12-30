
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Download, Share2, LayoutDashboard, ChevronDown, FileText, Info, RotateCcw, Plus, Minus, ChevronUp, GripVertical } from 'lucide-react';

interface IndicatorSpaceProps {
    onBack: () => void;
}

// --- Hierarchical Styling with User Specified Hex Colors ---
const nodeStyles = {
    l1: 'bg-[#C98A01] border-[#C98A01] text-white shadow-md font-bold',
    l2: 'bg-[#E6B63C] border-[#E6B63C] text-white shadow-sm font-semibold', // Updated: text-white
    l3: 'bg-[#FCE996] border-[#FCE996] text-[#7d5c00] shadow-sm',
    ghost: 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200',
    textOnly: 'text-gray-800 font-bold text-lg border-none bg-transparent shadow-none pointer-events-none',
};

// Group Formulas for summarizing nodes
const GROUP_METADATA: Record<string, { title: string; formula: string }> = {
    red: {
        title: '利息支出汇总组',
        formula: '汇总公式: ∑(单位活期存款利息支出 + 单位定期存款利息支出 + 单位通知存款利息支出 + 储蓄活期存款利息支出 + 储蓄定期存款利息支出 + 单位协议存款利息支出)'
    },
    green: {
        title: '存款余额汇总组',
        formula: '汇总公式: ∑(单位活期存款余额 + 单位定期存款余额 + 单位通知存款余额 + 储蓄活期存款余额 + 储蓄定期存款余额 + 单位协议存款余额)'
    }
};

const INITIAL_NODES = [
    // Column 1
    { id: 'c1-root', label: '财务管理', type: 'textOnly', col: 1, x: 50, y: 400 },
    { id: 'c1-sub', label: '财务分析', type: 'textOnly', col: 1, x: 250, y: 400 },
    { id: 'c1-3', label: '成本分析', type: 'ghost', col: 1, x: 450, y: 280 },
    { id: 'c1-4', label: '规模分析', type: 'ghost', col: 1, x: 450, y: 520 },

    // Column 2: Sub-indicator Lineage with Hierarchical Colors
    { id: 'core-1', label: '存款付息率', type: 'l1', col: 2, x: 750, y: 220, formula: '存款付息率 = 存款利息支出 ÷ 存款日均' },
    { id: 'core-2', label: '存款利息支出', type: 'l2', col: 2, x: 750, y: 340, formula: '存款利息支出 = ∑(每日存款余额 × 利率 / 360)' },
    { id: 'core-4', label: '存款日均', type: 'l2', col: 2, x: 750, y: 460, formula: '存款日均 = ∑从年初至统计时点的存款余额 ÷ 天数' },
    { id: 'core-3', label: '存款余额', type: 'l3', col: 2, x: 750, y: 600, formula: '存款余额 = 截至统计时点的存款总额' },

    // Column 3
    { id: 'list-1', label: '单位活期存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 120 },
    { id: 'list-2', label: '单位定期存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 160 },
    { id: 'list-3', label: '单位通知存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 200 },
    { id: 'list-4', label: '储蓄活期存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 240 },
    { id: 'list-5', label: '储蓄定期存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 280 },
    { id: 'list-6', label: '单位协议存款利息支出', type: 'ghost', col: 3, group: 'red', x: 1050, y: 320 },

    { id: 'list-11', label: '单位活期存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 440 },
    { id: 'list-12', label: '单位定期存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 480 },
    { id: 'list-13', label: '单位通知存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 520 },
    { id: 'list-14', label: '储蓄活期存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 560 },
    { id: 'list-15', label: '储蓄定期存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 600 },
    { id: 'list-16', label: '单位协议存款余额', type: 'ghost', col: 3, group: 'green', x: 1050, y: 640 },
];

const INITIAL_EDGES = [
    { from: 'c1-root', to: 'c1-sub' },
    { from: 'c1-sub', to: 'c1-3' },
    { from: 'c1-sub', to: 'c1-4' },
    { from: 'c1-3', to: 'core-1' },
    { from: 'c1-3', to: 'core-2' },
    { from: 'c1-4', to: 'core-3' },
    { from: 'c1-4', to: 'core-4' },
    { from: 'core-1', to: 'core-2', type: 'curved-back' },
    { from: 'core-4', to: 'core-1', type: 'curved-back' },
    { from: 'core-2', to: 'list-1', type: 'group-link', color: '#f87171', group: 'red' },
    { from: 'core-3', to: 'list-11', type: 'group-link', color: '#94a3b8', group: 'green' },
];

export const IndicatorSpace: React.FC<IndicatorSpaceProps> = ({ onBack }) => {
    const [nodes, setNodes] = useState(INITIAL_NODES);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const [pan, setPan] = useState({ x: 50, y: 50 });
    const [zoom, setZoom] = useState(0.8);
    const [isPanning, setIsPanning] = useState(false);

    const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
    const dragStartOffset = useRef({ x: 0, y: 0 });
    const panStart = useRef({ x: 0, y: 0 });

    const [isFormulaExpanded, setIsFormulaExpanded] = useState(true);
    const [formulaPos, setFormulaPos] = useState<{ x: number, y: number } | null>(null);
    const [isDraggingFormula, setIsDraggingFormula] = useState(false);
    const formulaDragStart = useRef({ x: 0, y: 0 });
    const formulaStartPos = useRef({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);
    const formulaPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWindowMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (draggedNodeId) {
                setNodes(prev => prev.map(node => {
                    if (node.id === draggedNodeId) {
                        return {
                            ...node,
                            x: (e.clientX - pan.x - dragStartOffset.current.x) / zoom,
                            y: (e.clientY - pan.y - dragStartOffset.current.y) / zoom
                        };
                    }
                    return node;
                }));
            } else if (isDraggingFormula) {
                const dx = e.clientX - formulaDragStart.current.x;
                const dy = e.clientY - formulaDragStart.current.y;
                setFormulaPos({
                    x: formulaStartPos.current.x + dx,
                    y: formulaStartPos.current.y + dy
                });
            } else if (isPanning) {
                setPan({
                    x: e.clientX - panStart.current.x,
                    y: e.clientY - panStart.current.y
                });
            }
        };

        const handleWindowMouseUp = () => {
            setDraggedNodeId(null);
            setIsPanning(false);
            setIsDraggingFormula(false);
        };

        window.addEventListener('mousemove', handleWindowMouseMove);
        if (draggedNodeId || isPanning || isDraggingFormula) {
            window.addEventListener('mouseup', handleWindowMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [draggedNodeId, isPanning, isDraggingFormula, pan, zoom]);

    const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === nodeId);
        if (!node || node.type === 'textOnly') return;

        // 问题4：禁止组内节点拖动（col 3 且有 group 属性的节点）
        if (node.col === 3 && node.group) {
            return; // 组内节点不可拖动
        }

        setDraggedNodeId(nodeId);
        dragStartOffset.current = {
            x: e.clientX - (node.x * zoom + pan.x),
            y: e.clientY - (node.y * zoom + pan.y)
        };
    };

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        setIsPanning(true);
        panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleFormulaMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (formulaPanelRef.current && canvasRef.current) {
            const panelRect = formulaPanelRef.current.getBoundingClientRect();
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setIsDraggingFormula(true);
            formulaDragStart.current = { x: e.clientX, y: e.clientY };
            formulaStartPos.current = {
                x: panelRect.left - canvasRect.left,
                y: panelRect.top - canvasRect.top
            };
        }
    };

    // 问题3：移除滚轮缩放功能
    // const handleWheel = (e: React.WheelEvent) => {
    //   const delta = e.deltaY > 0 ? -0.1 : 0.1;
    //   handleZoom(delta);
    // };

    const handleZoom = (delta: number) => {
        setZoom(prev => Math.min(Math.max(prev + delta, 0.3), 3));
    };

    const renderEdges = useMemo(() => {
        return INITIAL_EDGES.map((edge, idx) => {
            const startNode = nodes.find(n => n.id === edge.from);
            const endNode = nodes.find(n => n.id === edge.to);
            if (!startNode || !endNode) return null;

            const w = 150;
            const h = 40;
            const sx = startNode.x + (startNode.type === 'textOnly' ? 80 : (startNode.col === 3 ? 220 : w));
            const sy = startNode.y + (startNode.type === 'textOnly' ? 10 : h / 2);
            const ex = endNode.x;
            const ey = endNode.y + h / 2;

            const isActiveEdge = edge.group && hoveredGroupId === edge.group;

            if (edge.type === 'curved-back') {
                const curveX = Math.max(startNode.x, endNode.x) + w + 60;
                return (
                    <path
                        key={`edge-${idx}`}
                        d={`M ${sx} ${sy} C ${curveX} ${sy}, ${curveX} ${ey}, ${sx} ${ey}`}
                        fill="none" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead-gray)" opacity="0.6"
                    />
                );
            }

            if (edge.type === 'group-link') {
                const dx = ex - sx;
                return (
                    <path
                        key={`edge-${idx}`}
                        d={`M ${sx} ${sy} C ${sx + dx / 2} ${sy}, ${ex - dx / 2} ${ey}, ${ex} ${ey}`}
                        fill="none"
                        stroke={edge.color}
                        strokeWidth={isActiveEdge ? "2" : "1.2"}
                        strokeDasharray={isActiveEdge ? "none" : "5,3"}
                        markerEnd={`url(#arrowhead-${edge.color === '#f87171' ? 'red' : 'gray'})`}
                        className="transition-all duration-300"
                    />
                );
            }

            const midX = sx + (ex - sx) / 2;
            return (
                <path
                    key={`edge-${idx}`}
                    d={`M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ey} L ${ex} ${ey}`}
                    fill="none" stroke="#cbd5e1" strokeWidth="1"
                />
            );
        });
    }, [nodes, hoveredGroupId]);

    return (
        // Component height ensures a 32px gap from the bottom of the user's viewport
        <div className="flex-1 bg-white m-3 rounded-lg shadow-sm flex flex-col h-[calc(100vh-120px-32px)] overflow-hidden border border-gray-100 relative">

            {/* Navbar Actions */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-[70]">
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-xs text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600">
                        <Download size={14} />
                        规范下载
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-xs text-blue-600 bg-blue-50 rounded-md border border-blue-100 opacity-50">
                        <Share2 size={14} />
                        指标空间
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-xs text-blue-600 bg-blue-50 rounded-md border border-blue-100">
                        <LayoutDashboard size={14} />
                        指标看板
                    </button>
                </div>

                <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm px-5 py-2 border border-gray-200 rounded-md bg-white">
                    <RotateCcw size={14} />
                    返回
                </button>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 relative bg-[#fcfcfc] overflow-auto">

                <div
                    ref={canvasRef}
                    className={`w-full relative bg-white transition-all ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{ height: '100%', minHeight: '800px' }}
                    onMouseDown={handleCanvasMouseDown}
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                        style={{
                            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                            backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
                            backgroundPosition: `${pan.x}px ${pan.y}px`,
                        }}>
                    </div>

                    <div
                        className="absolute top-0 left-0 w-full h-full transform-gpu will-change-transform origin-top-left"
                        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
                    >
                        <div className="absolute top-0 left-[50px] w-[550px] border-b-2 border-gray-100 text-center py-4 font-bold text-gray-500">
                            指标三级分类
                        </div>
                        <div className="absolute top-0 left-[650px] w-[350px] border-b-2 border-gray-100 text-center py-4 font-bold text-gray-500">
                            子指标血缘
                        </div>
                        <div className="absolute top-0 left-[1020px] w-[300px] border-b-2 border-gray-100 text-center py-4 font-bold text-gray-500">
                            轻度汇总指标血缘
                        </div>

                        <svg className="absolute top-0 left-0 w-[4000px] h-[4000px] pointer-events-none z-10 overflow-visible">
                            <defs>
                                <marker id="arrowhead-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
                                </marker>
                                <marker id="arrowhead-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                    <polygon points="0 0, 8 3, 0 6" fill="#f87171" />
                                </marker>
                            </defs>
                            {renderEdges}
                        </svg>

                        {/* Group Containers with hover detection for summarized groups */}
                        <div
                            className={`absolute rounded-xl border-2 transition-all duration-500 z-0 cursor-help
                        ${hoveredGroupId === 'red' ? 'border-red-400 bg-red-50/40 shadow-lg' : 'border-red-100 bg-red-50/10'}`}
                            style={{ left: 1020, top: 100, width: 280, height: 260 }}
                            onMouseEnter={() => setHoveredGroupId('red')}
                            onMouseLeave={() => setHoveredGroupId(null)}
                        ></div>
                        <div
                            className={`absolute rounded-xl border-2 transition-all duration-500 z-0 cursor-help
                        ${hoveredGroupId === 'green' ? 'border-green-400 bg-green-50/40 shadow-lg' : 'border-green-100 bg-green-50/10'}`}
                            style={{ left: 1020, top: 420, width: 280, height: 380 }}
                            onMouseEnter={() => setHoveredGroupId('green')}
                            onMouseLeave={() => setHoveredGroupId(null)}
                        ></div>

                        <div className="absolute top-0 left-0 w-full h-full z-20">
                            {nodes.map(node => (
                                <div
                                    key={node.id}
                                    className={`absolute px-4 py-2 rounded-md shadow-sm text-sm font-medium text-center transition-all select-none flex items-center justify-center border group
                        ${nodeStyles[node.type as keyof typeof nodeStyles]}
                        ${node.type !== 'textOnly' ? 'cursor-move' : ''}
                        ${draggedNodeId === node.id ? 'z-50 shadow-xl scale-105 opacity-90' : 'z-10'}
                        ${node.group && hoveredGroupId === node.group ? 'ring-2 ring-blue-400' : ''}
                        `}
                                    style={{
                                        left: node.x,
                                        top: node.y,
                                        width: node.type === 'textOnly' ? 'auto' : (node.col === 3 ? '220px' : '150px'),
                                        height: node.type === 'textOnly' ? 'auto' : '36px',
                                    }}
                                    onMouseEnter={() => {
                                        if (node.col !== 3) setHoveredNodeId(node.id);
                                        if (node.group) setHoveredGroupId(node.group);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredNodeId(null);
                                        setHoveredGroupId(null);
                                    }}
                                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                                >
                                    {node.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Formula Panel with Dedicated Drag Handle */}
                    <div
                        ref={formulaPanelRef}
                        className={`absolute z-[100] bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isFormulaExpanded ? 'w-[480px]' : 'w-[220px]'} ${!formulaPos ? 'bottom-8 left-8' : ''}`}
                        style={formulaPos ? { left: formulaPos.x, top: formulaPos.y } : undefined}
                    >
                        <div
                            className="flex items-center bg-gray-50/80 border-b border-gray-100 transition-colors hover:bg-gray-100 flex-nowrap h-12"
                        >
                            {/* Dedicated Drag Handle */}
                            <div
                                className="px-3 h-full flex items-center cursor-move border-r border-gray-200 text-gray-400 hover:text-blue-500 shrink-0"
                                onMouseDown={handleFormulaMouseDown}
                                title="按住此处拖拽"
                            >
                                <GripVertical size={16} />
                            </div>

                            {/* Expansion Trigger (Rest of header) - Title fixed on one line with no wrap */}
                            <div
                                className="flex-1 flex items-center gap-2 px-3 h-full cursor-pointer select-none whitespace-nowrap overflow-hidden"
                                onClick={() => setIsFormulaExpanded(!isFormulaExpanded)}
                            >
                                <FileText size={16} className="text-blue-500 shrink-0" />
                                <span className="text-sm font-bold text-gray-700 whitespace-nowrap">指标合成公式注释</span>
                                {isFormulaExpanded ? <ChevronDown size={14} className="ml-auto text-gray-400 shrink-0" /> : <ChevronUp size={14} className="ml-auto text-gray-400 shrink-0" />}
                            </div>
                        </div>

                        {isFormulaExpanded && (
                            <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-1">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-[#C98A01] text-white rounded text-[10px] font-bold">存款付息率</span>
                                    <span className="text-gray-400">=</span>
                                    <span className="px-2 py-1 bg-[#E6B63C] text-white rounded border border-[#E6B63C] text-[10px] font-semibold">存款利息支出</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="px-2 py-1 bg-[#E6B63C] text-white rounded border border-[#E6B63C] text-[10px] font-semibold">存款日均</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-[#E6B63C] text-white rounded border border-[#E6B63C] text-[10px] font-semibold">存款日均</span>
                                    <span className="text-gray-400 text-[10px]">= ∑从年初至统计时点的</span>
                                    <span className="px-2 py-1 bg-[#FCE996] text-[#7d5c00] rounded border border-[#FCE996] text-[10px] font-semibold">存款余额</span>
                                    <span className="text-gray-400 text-[10px]">/ 自然日天数</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tooltips for Indicators AND Summary Groups */}
                    {(hoveredNodeId || (hoveredGroupId && !hoveredNodeId)) && (
                        <div
                            className={`fixed bg-white border border-blue-100 p-4 rounded-lg shadow-2xl z-[200] pointer-events-none animate-in fade-in zoom-in duration-150 transition-all
                        ${hoveredGroupId && !hoveredNodeId ? 'w-[196px]' : 'min-w-[280px]'}`}
                            style={{
                                left: mousePos.x + 20,
                                top: mousePos.y + 20
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-50">
                                <Info size={14} className="text-blue-500" />
                                <span className="font-bold text-gray-800 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                    {hoveredNodeId
                                        ? nodes.find(n => n.id === hoveredNodeId)?.label
                                        : GROUP_METADATA[hoveredGroupId!]?.title}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 leading-relaxed font-mono whitespace-normal break-words">
                                {hoveredNodeId
                                    ? (nodes.find(n => n.id === hoveredNodeId)?.formula || '暂无业务描述')
                                    : GROUP_METADATA[hoveredGroupId!]?.formula}
                            </div>
                        </div>
                    )}

                    <div className="absolute top-10 right-10 flex flex-col gap-3 z-[80]">
                        <button
                            onClick={() => { setPan({ x: 50, y: 50 }); setZoom(0.8); setFormulaPos(null); }}
                            className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center group"
                        >
                            <RotateCcw size={20} className="group-active:rotate-[-90deg] transition-transform" />
                        </button>
                        <button onClick={() => handleZoom(0.1)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                            <Plus size={20} />
                        </button>
                        <button onClick={() => handleZoom(-0.1)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                            <Minus size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
