export interface Project {
    id: string,
    title: string,
    releaseDate: string,
    createdBy: string,
    duration: string,
    genre: string,
    description?: string,
    credits?: string[],
    awards?: string[],
    ytVideoId: string,
    roles: string[]
}