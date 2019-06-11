import { makeRequest as request } from './makeRequest'


// @todo add_attachment
export default class V1 {
	apikey: string;
	private baseUrl: string;
	private requestHeaders: KanbanizeHeaders;

	constructor(subdomain, apikey) {
		this.apikey = apikey;
		this.requestHeaders = {
			apikey
		};
		this.baseUrl = `https://${subdomain}.kanbanize.com/index.php/api/kanbanize`;
	}

	private async makeCall(fn: string, body?: any) {
		const endpoint = [this.baseUrl, fn, 'format/json'].join('/');
		return request(endpoint, this.requestHeaders, body || {});
	}

	async getProjectsAndBoards(): Promise<projectsAndBoards> {
		return this.makeCall('get_projects_and_boards')
	}

	async getBoardStructure(params: boardidRequired): Promise<boardStructure> {
		return this.makeCall('get_board_structure', params)
	}

	async getFullBoardStructure(params: boardidRequired): Promise<fullBoardStructure> {
		return this.makeCall('get_full_board_structure', params)
	}

	async getBoardSettings(params: boardidRequired): Promise<boardSettings> {
		return this.makeCall('get_board_settings', params)
	}

	async getBoardActivities(params: boardActivityParameters): Promise<boardActivityOutput> {
		return this.makeCall('get_board_activities', params)
	}


	/**
	 *  the user identified by the API key has pre-configured default column or 
	 * swimlane for the specified board, and no ‘column’ or ‘lane’ parameter is 
	 * supplied in the request, the task will be created in the column and swimlane 
	 * specified in the default board settings.
	 * 
	 * If no default column or swimlane are configured for the specified board 
	 * and no ‘column’ or ‘lane’ parameters are supplied in the request, the task 
	 * will be created into the first swimlane of the Backlog section of the board.
	 * 
	 * If ‘column’, ‘lane’ and/or ‘position’ parameters are supplied, then a move 
	 * operation is executed automatically after the creation of the task. The 
	 * ‘column’ and ‘lane’ parameters effectively override any configurations with respect to where the task is to be created.
	 */

	async createNewTask(params: createNewTaskParameters): Promise<createNewTaskOutput> {
		return this.makeCall('create_new_task', params)
	}

	async deleteTask(params: BasicTaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('delete_task', params)
	}

	async getTaskDetails(params: getTaskDetailsParamters): Promise<getTaskDetailsOutput> {
		return this.makeCall('get_task_details', params)
	}

	async getAllTasks(params: getAllTaskParameters): Promise<getAllTasksOutput> {
		return this.makeCall('get_all_tasks', params)
	}

	async addComment(params: addCommentParameters): Promise<addCommentOutput> {
		return this.makeCall('add_comment', params)
	}

	async moveTask(params: moveTaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('move_task', params);
	}

	async editTask(params: editTaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('edit_task', params);
	}

	async blockTask(params: blockTaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('block_task', params);
	}

	async addSubtask(params: addSubtaskParameters): Promise<addSubtaskOutput> {
		return this.makeCall('add_subtask', params);
	}

	async editSubtask(params: editSubtaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('edit_subtask', params);
	}

	async logTime(params: logTimeParameters): Promise<logTimeOutput> {
		return this.makeCall('log_time', params);
	}

	async getLinks(params: getLinksParameters): Promise<getLinksOutput> {
		return this.makeCall('get_links', params);
	}

	async editLink(params: editLinkParameters): Promise<taskOperationOutput> {
		return this.makeCall('edit_link', params);
	}

	async archiveTask(params: archiveTaskParameters): Promise<taskOperationOutput> {
		return this.makeCall('archive_task', params);
	}

	async editCustomFields(params: editCustomFieldsParameter): Promise<taskOperationOutput> {
		return this.makeCall('edit_custom_fields', params);
	}

	async getAttachment(params: getAttachmentParameters): Promise<any> {
		return this.makeCall('get_attachment', params);
	}

	async getLogTimeActivities(params: getLogTimeActivitiesParameters): Promise<getLogTimeActivitiesOutput> {
		return this.makeCall('get_log_time_activities', params);
	}

	async getTasksWithLogTime(params: getTasksWithLogTimeParameters): Promise<getTasksWithLogTimeOutput> {
		return this.makeCall('get_tasks_with_log_time', params);
	}
}