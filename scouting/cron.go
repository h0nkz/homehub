package scouting

import (
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
	job, err := scheduler.NewJob(
		gocron.DurationJob(
			time.Duration(interval)*time.Second,
		),
		createScoutTask(location, objective),
	)

	return job.ID(), err
}

func EditScoutingJob(jobId uuid.UUID, location string, objective string, interval int) error {
	_, err := scheduler.Update(jobId,
		gocron.DurationJob(
			time.Duration(interval)*time.Second,
		),
		createScoutTask(location, objective),
	)

	return err
}

func createScoutTask(location string, objective string) gocron.Task {
	return gocron.NewTask(
		func(location string, objective string) {
			Scout(location, objective)
		},
		location,
		objective,
	)
}

func RemoveScoutingJob(jobID uuid.UUID) error {
	return scheduler.RemoveJob(jobID)
}
