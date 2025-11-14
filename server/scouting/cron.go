package scouting

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron/v2"
	"github.com/google/uuid"
)

var scheduler = initializeScheduler()

func initializeScheduler() gocron.Scheduler {
	scheduler, err := gocron.NewScheduler()

	if err != nil {
		panic(err.Error())
	}

	scheduler.Start()
	return scheduler
}

// ShutDownScheduler is function which encapsulate the shutting down of the scheduler
func ShutDownScheduler() {
	scheduler.Shutdown()
}

func AddScoutingJob(location string, objective string, interval int) (uuid.UUID, error) {

	fmt.Println("Hello cron")

	job, err := scheduler.NewJob(
		gocron.DurationJob(
			time.Duration(interval)*time.Second,
		),
		gocron.NewTask(
			func(i int) {
				fmt.Println(objective)
			},
			1,
		),
	)

	return job.ID(), err
}

func RemoveScoutingJob(jobID uuid.UUID) error {
	return scheduler.RemoveJob(jobID)
}
