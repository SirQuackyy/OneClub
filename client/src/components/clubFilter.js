import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Combobox } from '@headlessui/react'

export default function ClubFilter({ filter,  setFilter }){
    const [show, setActive] = useState(false)
    const showModal = () => setActive(true);
    const hideModal = () => setActive(false);
    const buckets = [
        'None',
        'Academic',
        'Cultural',
        'Special Interest/Student Life',
        'Sports/Activities',
        'Service',
      ]
    
    const [selectedBucket, setSelectedBucket] = useState(buckets[0])
    const [query, setQuery] = useState('')
    

    const filteredBuckets =
    query === ''
      ? buckets
      : buckets.filter((bucket) => {
          return bucket.toLowerCase().includes(query.toLowerCase())
        })
    return (
        <div>
            <input onClick = {showModal} className="h-20 w-auto pt-1"  type="image" src="https://static.vecteezy.com/system/resources/previews/009/008/831/original/of-filter-icon-filter-logo-isolated-on-white-background-free-vector.jpg" />


            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                <Modal.Title>Choose Filter</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                         <Combobox value={selectedBucket} onChange={(e) => {
                                                                                console.log("hi");
                                                                                setSelectedBucket(e);
                                                                                setFilter(e);
                                                                                
                                                                            }}>
                            <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
                            <Combobox.Options>
                                {filteredBuckets.map((bucket) => (
                                <Combobox.Option className="bg-gray-100 text-gray-900" key={bucket} value={bucket}>
                                    {bucket}
                                </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox> 
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
    );
}