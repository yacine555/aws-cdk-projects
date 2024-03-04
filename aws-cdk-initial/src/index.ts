export const handler = async (event: { name: string }) => {
    const result: string = event.name ? `Hello cdk ${event.name}!` : 'Hello CDK'
    return result
}