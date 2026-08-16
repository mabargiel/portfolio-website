const line = "fill-none stroke-line stroke-[1.25]";
const node = "fill-none stroke-gold stroke-[1.25]";
const label = "font-mono text-[14px] fill-text-2";
const dim = "font-mono text-[14px] fill-text-3";
const core = "font-mono text-[16px] tracking-wide fill-gold";

function WorkflowEngine() {
  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Upstream events and manuscript facts feed a workflow engine configured by a versioned workflow definition. The engine completes tasks, transitions stages and assigns actors."
    >
      <g className={line}>
        <path d="M150 90 H182 V172 H206" />
        <path d="M150 266 H182 V190 H206" />
        <path d="M320 330 V218" />
        <path d="M434 166 H452 V58 H466" />
        <path d="M434 180 H466" />
        <path d="M434 194 H452 V296 H466" />
      </g>
      <rect className={node} x="206" y="140" width="228" height="78" rx="3" />
      <text className={core} x="320" y="185" textAnchor="middle">
        WORKFLOW ENGINE
      </text>
      <g className={label}>
        <text x="142" y="94" textAnchor="end">
          upstream events
        </text>
        <text x="142" y="270" textAnchor="end">
          manuscript facts
        </text>
        <text x="474" y="62">
          task completion
        </text>
        <text x="474" y="184">
          stage transitions
        </text>
        <text x="474" y="300">
          actor assignments
        </text>
      </g>
      <text className={dim} x="320" y="352" textAnchor="middle">
        versioned workflow definition
      </text>
    </svg>
  );
}

function DataBlend() {
  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="A blend service joins subsurface, production and laboratory data, feeding dashboards and desktop and web clients."
    >
      <g className={line}>
        <path d="M195 84 H230" />
        <path d="M105 162 V112" />
        <path d="M105 218 V268" />
        <path d="M195 190 H230" />
        <path d="M410 84 H445" />
        <path d="M410 190 H445" />
      </g>
      <g className={line}>
        <rect x="15" y="56" width="180" height="56" rx="3" />
        <rect x="15" y="268" width="180" height="56" rx="3" />
        <rect x="230" y="56" width="180" height="56" rx="3" />
        <rect x="230" y="162" width="180" height="56" rx="3" />
        <rect x="445" y="56" width="180" height="56" rx="3" />
        <rect x="445" y="162" width="180" height="56" rx="3" />
      </g>
      <rect className={node} x="15" y="162" width="180" height="56" rx="3" />
      <text className={core} x="105" y="196" textAnchor="middle">
        BLEND
      </text>
      <g className={label}>
        <text x="105" y="90" textAnchor="middle">
          wells · wellbores
        </text>
        <text x="105" y="302" textAnchor="middle">
          OSDU
        </text>
        <text x="320" y="90" textAnchor="middle">
          production
        </text>
        <text x="320" y="196" textAnchor="middle">
          dashboards
        </text>
        <text x="535" y="90" textAnchor="middle">
          lab blends
        </text>
        <text x="535" y="196" textAnchor="middle">
          desktop · web
        </text>
      </g>
      <text className={dim} x="320" y="358" textAnchor="middle">
        three systems, one engagement
      </text>
    </svg>
  );
}

function BackendsForFrontends() {
  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Two micro-frontends each have their own backend for frontend. Each draws from several domain microservices, with one service shared between them."
    >
      <g className={line}>
        <path d="M180 96 V140" />
        <path d="M460 96 V140" />
        <path d="M180 202 V246 H125 V286" />
        <path d="M180 202 V246 H320 V286" />
        <path d="M460 202 V246 H515 V286" />
        <path d="M460 202 V246 H320 V286" />
      </g>
      <g className={line}>
        <rect x="90" y="42" width="180" height="54" rx="3" />
        <rect x="370" y="42" width="180" height="54" rx="3" />
        <rect x="50" y="286" width="150" height="50" rx="3" />
        <rect x="245" y="286" width="150" height="50" rx="3" />
        <rect x="440" y="286" width="150" height="50" rx="3" />
      </g>
      <rect className={node} x="90" y="140" width="180" height="62" rx="3" />
      <rect className={node} x="370" y="140" width="180" height="62" rx="3" />
      <text className={core} x="180" y="178" textAnchor="middle">
        BFF
      </text>
      <text className={core} x="460" y="178" textAnchor="middle">
        BFF
      </text>
      <g className={label}>
        <text x="180" y="75" textAnchor="middle">
          licences ui
        </text>
        <text x="460" y="75" textAnchor="middle">
          devices ui
        </text>
      </g>
      <g className={dim}>
        <text x="125" y="316" textAnchor="middle">
          users
        </text>
        <text x="320" y="316" textAnchor="middle">
          licences
        </text>
        <text x="515" y="316" textAnchor="middle">
          inventory
        </text>
        <text x="320" y="366" textAnchor="middle">
          kubernetes · openapi · asyncapi
        </text>
      </g>
    </svg>
  );
}

const diagrams = {
  "workflow-engine": WorkflowEngine,
  "data-blend": DataBlend,
  bff: BackendsForFrontends,
};

export type DiagramName = keyof typeof diagrams;

export function ProjectDiagram({ name }: { name: DiagramName }) {
  const Diagram = diagrams[name];
  return (
    <figure className="border-line bg-base rounded-lg border px-5.5 py-6.5 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
      <Diagram />
    </figure>
  );
}
