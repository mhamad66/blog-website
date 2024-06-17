import React from 'react';

const Post = ({ params }: { params: { id: number } }) => {
    return (
        <section>
            ssss {params.id}
        </section>
    );
};

export default Post;
