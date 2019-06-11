import V1 from './V1';

const KanbanizeAPI = {
	V1,
	V2: () => { throw "V2 not yet supported" }
}

export default KanbanizeAPI;